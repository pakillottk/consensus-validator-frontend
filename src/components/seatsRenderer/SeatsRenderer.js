import React from 'react'
import { SeatsPositioner, SeatsPositionerCurve } from '../../2d/SeatsPositioner'
import { quadraticBezier } from '../../2d/utils'
import GetSeatState from '../../entities/SeatReserves/GetSeatState'
import CalcSeatPrice from '../../entities/SeatPrices/CalcSeatPrice'

import { connect } from 'react-redux'

class SeatsRenderer extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            hoveredSeat: null
        }
    }

    isSelected( seatsSelected, zoneId, row, seatIndex ) {
        if( !seatsSelected ) {
            return false
        }
        return seatsSelected.some( seat => {
            return seat.zoneId === zoneId &&
            seat.row === row &&
            seat.seatIndex === seatIndex
        })
    }

    isPriced( zoneId, row, seatIndex ) {
        const { seatprices } = this.props
        const prices = CalcSeatPrice( zoneId, seatprices, row, seatIndex )
        
        return prices.length > 0 ? prices : null
    }

    isSold( zoneId, row, seatIndex ) {
        const { sales } = this.props
        return sales.some( sale => {
            return sale.code.zone_id === zoneId &&
            sale.code.row_index === row &&
            sale.code.seat_index === seatIndex
        })
    }

    renderSeats( zone, color, polygon, rows ) {
        const { me, seatreserves, lockSold, showOnlyPriced, showSeatState, seatsSelected } = this.props
        const onSeatHover = this.props.onSeatHover || ( () => {} )
        const onSeatHoverExit = this.props.onSeatHoverExit || ( () => {} )
        const onSeatClick = this.props.onSeatClick || ( () => {} )
        const seats = []
        const seatSizes = []
        const seatPositions = []
        const seatNumbers = []
        let seatCounter = 0
        rows.forEach(
            (row, index) => { 
                let points = []
                if( row.type === 'line' ) {
                    points = SeatsPositioner( polygon, row.rowOffset, row.rowDirection, row.orientation, 
                        row.seats, row.seatSize, row.seatSpacing, row.startMargin
                    )
                } else {
                    points = SeatsPositionerCurve(
                        polygon, 
                        { 
                            p0: { x: row.p0x, y: row.p0y }, 
                            p1: { x: row.p1x, y: row.p1y },
                            p2: { x: row.p2x, y: row.p2y } 
                        }, 
                        row.rowDirection,
                        row.startMargin,
                        row.seats, 
                        row.seatSize,
                        row.seatSpacing
                    )   
                }
                let seatInr 
                switch (row.numeration) {
                    case 'even':
                    case 'odd': {
                        seatInr = 2
                        break
                    }
                    default: {
                        seatInr = 1
                    }
                }

                let seatNumber 
                let seatHovered = false
                for( let i = 0; i < points.length; i++ ) {                    
                    seatPositions.push( points[i] )
                    
                    seatNumber = row.firstSeat + (seatInr * i)
                    seatNumbers.push( seatNumber )
                    seatSizes.push( row.seatSize )

                    if( this.state.hoveredSeat ) {
                        seatHovered = this.state.hoveredSeat.row === row && 
                                      this.state.hoveredSeat.seat === i
                    }

                    const selected = this.isSelected( seatsSelected, zone.id, index+1, i+1 )
                    const seatState = GetSeatState( seatreserves, zone.id, index+1, i+1, me.id )
                    let seatColor = color
                    if( showSeatState ) {
                        switch( seatState.state ) {
                            case 'OCUPADO': {
                                seatColor = { r: 0, g: 0, b: 0, a: 0.5 }
                                break
                            }
                            case 'BLOQUEADO': {
                                seatColor = { r: 255, g: 110, b: 0, a: 1.0 }
                                break
                            }
                            case 'RESERVADO': {
                                seatColor = { r: 100, g: 0, b: 255, a: 1.0 }
                                break
                            }
                            default: {
                                seatColor = { ...color, a: 1.0 }
                            }
                        }
                    }
                    if( selected ) {
                        seatColor = {...seatColor, r: 200, g: 150, b: 0 }
                    }

                    let usableSeat = true
                    const seatPrice = this.isPriced( zone.id, index+1, i+1 );
                    if( showOnlyPriced ) {
                        if( !seatPrice ) {
                            usableSeat = false
                            seatColor = { r: 200, g: 200, b: 200, a:1.0 }
                        }
                    }
                    if( lockSold  ) {
                        if( this.isSold( zone.id, index+1, i+1 ) ) {
                            usableSeat = false
                            seatColor = { r:200, g:200, b:200, a:1.0 }
                        }
                    }                    

                    if( usableSeat ) {
                        seats.push(
                            <a 
                                key={seatCounter++} 
                                style={{
                                    cursor:'pointer', 
                                    position:'relative', 
                                    zIndex:15, 
                                    pointerEvents:'auto',
                                    opacity: seatHovered ? 0.7 : 1.0
                                }}
                                onClick={()=> onSeatClick( zone.id, index+1, i+1, row.firstSeat + (seatInr * i), points[i], seatState, seatPrice )}
                                onMouseEnter={() => { this.setState({hoveredSeat:{row,seat:i}}); onSeatHover( zone.id, index+1, i+1, row.firstSeat + (seatInr * i), points[i] ) }}
                                onMouseLeave={() => { this.setState({hoveredSeat:null}); onSeatHoverExit( zone.id, index+1, i+1, row.firstSeat + (seatInr * i), points[i] ) }}
                            >
                                <circle                                                     
                                    cx={points[i].x} 
                                    cy={points[i].y} 
                                    r={row.seatSize} 
                                    style={{fill:`rgba(${seatColor.r},${seatColor.g},${seatColor.b},${seatColor.a || 1.0})`}} 
                                />
                            </a>
                        )    
                    } else {
                        seats.push(
                            <a 
                                key={seatCounter++} 
                                style={{
                                    cursor:'pointer', 
                                    position:'relative', 
                                    zIndex:15, 
                                    pointerEvents:'none',
                                }}
                            >
                                <circle                                                     
                                    cx={points[i].x} 
                                    cy={points[i].y} 
                                    r={row.seatSize} 
                                    style={{fill:`rgba(200, 200, 200, 1.0)`}} 
                                />
                            </a>
                        )
                    }
                }
            }
        )

        return { rendered: seats, sizes: seatSizes, positions: seatPositions, numeration: seatNumbers }
    }

    renderSeatNumbers( seatData ) {
        const numbers = []

        let position, halfSeatSize
        for( let i = 0; i < seatData.positions.length; i++ ) {
            position = seatData.positions[ i ]
            halfSeatSize = seatData.sizes[ i ] * 0.5
            numbers.push(
                <div
                    key={i}
                    style={{
                        position:'absolute',
                        zIndex:16,
                        top: position.y - halfSeatSize,
                        left: position.x - halfSeatSize,
                        fontSize: (seatData.sizes[ i ]) + 'px',
                        color:'white'
                    }}
                >
                    {seatData.numeration[i]}
                </div>
            )
        }

        return numbers
    }

    renderCurves( rows ) {
        const curves = []
        rows.forEach(
            ( row, index ) => {
                if( row.type !== 'curve' ) {
                    return
                }

                const curve = { 
                    p0: { x: row.p0x, y: row.p0y }, 
                    p1: { x: row.p1x, y: row.p1y },
                    p2: { x: row.p2x, y: row.p2y } 
                }

                let points = ""
                const step = 1.0/256.0
                for( let i = 0; i <= 1.0; i += step) {
                    const curvePoint = quadraticBezier( curve.p0, curve.p1, curve.p2, i );
                    points += curvePoint.x + "," + curvePoint.y + " ";
                }

                curves.push(
                    <a key={index}>
                        <polyline points={points} style={{fill:'none', stroke:'rgba( 0, 0, 255, 0.75 )', strokeWidth:3}} />

                        <circle cx={curve.p0.x} cy={curve.p0.y} r={6} style={{fill:'rgba(0,70,0,0.5)'}} />
                        <circle cx={curve.p1.x} cy={curve.p1.y} r={6} style={{fill:'rgba(255,255,0,0.5)'}} />
                        <circle cx={curve.p2.x} cy={curve.p2.y} r={6} style={{fill:'rgba(255,0,0,0.5)'}} />
                    </a>
                )
            }
        )

        return curves
    }   


    renderLines( polygon, rows ) {
        const lines = []

        rows.forEach( 
            ( row, index ) => {
                if( row.type !== 'line' ) {
                    return
                }

                let inBoundX1, inBoundX2, inBoundY1, inBoundY2

                if( row.orientation === 'horizontal' ) {
                    inBoundY1 = inBoundY2 = polygon.bounds[1] + row.rowOffset + row.seatSize * 0.5
                    inBoundX1 = polygon.bounds[0]
                    while( !polygon.isInside({ x: inBoundX1, y: inBoundY1 }) ) {
                        if( inBoundX1 > polygon.bounds[2] ) {
                            break
                        }

                        inBoundX1 += 0.1
                    }

                    inBoundX2 = polygon.bounds[2]
                    while( !polygon.isInside({ x: inBoundX2, y: inBoundY2 }) ) {
                        if( inBoundX2 < polygon.bounds[0] ) {
                            break
                        }

                        inBoundX2 -= 0.1
                    }
                } else {
                    inBoundX1 = inBoundX2 = polygon.bounds[0]+ row.rowOffset + row.seatSize * 0.5
                    inBoundY1 = polygon.bounds[1]
                    while( !polygon.isInside({ x: inBoundX1, y: inBoundY1 }) ) {
                        if( inBoundY1 > polygon.bounds[3] ) {
                            break
                        }

                        inBoundY1 += 0.1
                    }

                    inBoundY2 = polygon.bounds[3]
                    while( !polygon.isInside({ x: inBoundX2, y: inBoundY2 }) ) {
                        if( inBoundY2 < polygon.bounds[1] ) {
                            break
                        }

                        inBoundY2 -= 0.1
                    }
                }  

                lines.push(
                    <line 
                        key={index} 
                        x1={ inBoundX1 } 
                        y1={ inBoundY1 }
                        x2={ inBoundX2 } 
                        y2={ inBoundY2 }
                        stroke="rgba(0,0,255,1.0)"
                        strokeWidth={2}
                    />
                )
            }
         )

        return lines
    }

    render() {
        const { rows, polygon, zone, color, showCurves, showLines } = this.props
        if( !polygon || !rows ) {
            return null
        }
        const [ width, height ] = [ polygon.bounds[ 2 ], polygon.bounds[ 3 ] ]
        const seatData = this.renderSeats( zone, color, polygon, rows );
        return(
        <div style={{position:'relative', zIndex:5, pointerEvents:'none'}}>
                <svg width={ width } height={ height } style={{position:'relative', zIndex: 10}}>
                    { seatData.rendered }                    
                    { showCurves && this.renderCurves( rows ) }
                    { showLines && this.renderLines( polygon, rows ) }
                </svg>
                { this.renderSeatNumbers( seatData ) }
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            me: store.auth.me,
            seatreserves: store.seatreserves.data,
            seatprices: store.seatprices.data,
            sales: store.sales.data
        }
    }
)(SeatsRenderer)
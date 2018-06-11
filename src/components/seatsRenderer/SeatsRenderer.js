import React from 'react'
import { SeatsPositioner, SeatsPositionerCurve } from '../../2d/SeatsPositioner'
import { quadraticBezier } from '../../2d/utils'

export default class SeatsRenderer extends React.Component {
    renderSeats( color, polygon, rows ) {
        const seats = []
        let seatCounter = 0
        rows.forEach(
            (row, index) => { 
                let points = []
                if( row.type === 'line' ) {
                    points = SeatsPositioner( polygon, row.rowOffset, row.rowDirection, row.orientation, 
                        row.seats, row.seatSize, row.seatSpacing, row.startMargin
                    )
                } else {
                    points = SeatsPositionerCurve({ 
                            p0: { x: row.p0x, y: row.p0y }, 
                            p1: { x: row.p1x, y: row.p1y },
                            p2: { x: row.p2x, y: row.p2y } 
                        }, 
                        row.rowDirection,
                        row.seats, 
                        row.seatSize
                    )   
                }
                
                for( let i = 0; i < points.length; i++ ) {
                    seats.push(
                        <a key={seatCounter++} style={{cursor:'pointer', position:'relative', zIndex:15}}>
                            <circle                                                     
                                cx={points[i].x} 
                                cy={points[i].y} 
                                r={row.seatSize} 
                                style={{fill:`rgba(${color.r},${color.g},${color.b},1.0)`}} 
                            />
                        </a>
                    )
                }
            }
        )

        return seats
    }

    renderCurves( rows ) {
        const curves = []
        rows.forEach(
            ( row, index ) => {
                if( row.type === 'line' ) {
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

    render() {
        const { rows, polygon, color, showCurves } = this.props
        if( !polygon || !rows ) {
            return null
        }
        const [ width, height ] = [ polygon.bounds[ 2 ], polygon.bounds[ 3 ] ]
        return(
            <div style={{width:'100%', height:'100%'}}>
                <svg width={ width } height={ height } style={{position:'relative', pointerEvents:'all'}}>
                    { this.renderSeats( color, polygon, rows ) }
                    { showCurves && this.renderCurves( rows ) }
                </svg>
            </div>
        )
    }
}
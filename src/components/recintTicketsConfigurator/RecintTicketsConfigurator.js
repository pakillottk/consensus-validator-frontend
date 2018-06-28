import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPricesTable from '../entitites/seatprices/SeatPricesTable'
import SeatPriceRenderer from '../seatPriceRenderer/SeatPriceRenderer'
import SeatReservesTable from '../entitites/seatreserves/SeatReservesTable'
import Segment from '../ui/segment/Segment'
import Button from '../ui/button/Button'
import Table from '../ui/table/Table'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import { crud as ReservesActions } from '../../redux/actions/seatreserves'
import { crud as SaleActions } from '../../redux/actions/sales'
import ReserveSeatsButton from '../reserveSeatsButton/ReserveSeatsButton'
import FreeSeatsButton from '../freeSeatsButton/FreeSeatsButton'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'
import BuildZoneTables from '../../entities/SeatPrices/BuildZoneTables'

class RecintTicketsConfigurator extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null,
            selectedSeats: []
        }
    }

    componentWillMount() {
        const { 
            sessionId, 
            fetchZones, 
            fetchPolygons, 
            fetchSeats, 
            fetchReserves, 
            fetchSales 
        } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
        fetchSales( '?session='+sessionId )
    }

    showSeatPrice( zoneId, row, seatIndex, seatNumber, position ) {
        this.setState({
            seatInfo:<SeatPriceRenderer 
                        zoneId={zoneId} 
                        row={row} 
                        seatIndex={seatIndex}
                        seatNumber={seatNumber}
                        position={position}
                    />
        })
    }

    isSeatInArray( seatsArray, seatData ) {
        let seatFound = null
        seatsArray.some( seat => {
            if(    
                seat.zoneId === seatData.zoneId &&
                seat.row === seatData.row &&
                seat.seatIndex === seatData.seatIndex
            ) {
                seatFound = seat
                return true
            }

            return false
        })

        return seatFound
    }

    deselectSeat( index ) {
        let selectedSeats = [...this.state.selectedSeats]
        selectedSeats.splice( index, 1 )
        for( let i = index; i < selectedSeats.length; i++ ) {
            selectedSeats[ i ].index--
        }
        this.setState({selectedSeats})
    }

    seatSelected( zoneId, row, seatIndex, seatNumber, position ) {
        const selectedSeats = [...this.state.selectedSeats]
        const seatData = {
            index: selectedSeats.length,
            zoneId,
            zone: this.props.zones.get( parseInt(zoneId,10) ).zone,
            row,
            seatIndex,
            seatNumber,
            position
        }
        const seatStored = this.isSeatInArray( selectedSeats, seatData ) 
        if( seatStored === null ) {
            selectedSeats.push( seatData )
        } else {
            return this.deselectSeat( seatStored.index )
        }
        
        this.setState({selectedSeats})
    }

    renderZoneSummary() {
        const { zones, zoneTables } = this.props
        const items = []
        const totals = {
            zone: 0,
            rows: 0,
            seats: 0,
            assigned: 0,
            left: 0
        }
        zones.forEach( zone => {
            if( !zoneTables[ zone.id ] ) {
                return
            }
            const zoneData = zoneTables[ zone.id ]
            const rows = zoneData.length
            let seats = 0
            let assigned = 0
            for( let i = 0; i < rows; i++ ) {
                const rowSeats = zoneData[ i ].length
                seats += rowSeats
                for( let j = 0; j < rowSeats; j++ ) {
                    if( zoneData[i][j].length > 0 ) {
                        assigned++;
                    }
                }
            }

            items.push({
                zone: zone.zone,
                rows,
                seats,
                assigned,
                left: seats - assigned
            })

            totals.zone++
            totals.rows += rows
            totals.seats += seats
            totals.assigned += assigned
            totals.left += ( seats - assigned )
        })

        return(
            <Table
                fields={[
                    {label:'ZONA', name:'zone'},
                    {label:'FILAS', name:'rows'},
                    {label:'ASIENTOS', name:'seats'},
                    {label:'CON PRECIO', name:'assigned'},
                    {label:'SIN USAR', name:'left'},
                ]}
                items={items}
                full
                calculateTotals={ items => totals }
            />
        )
    }

    render() {
        const { sessionId, plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }
        return(
            <div>
                <div>
                    <Segment secondary>
                        <h2 style={{textAlign:'center'}}>AFORO</h2>
                    </Segment>
                    {this.renderZoneSummary()}
                </div>
                <div style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                    <RecintRenderer
                        plane={plane}
                        zones={zones}
                        polygons={polygons}
                        rows={seats}
                        onSeatHover={ this.showSeatPrice.bind(this) }
                        onSeatHoverExit={()=>this.setState({seatInfo:null})}
                        onSeatClick={ this.seatSelected.bind( this ) }
                        lockSold
                        showSeatState
                        seatsSelected={this.state.selectedSeats}
                    >
                        {this.state.seatInfo}
                    </RecintRenderer>
                    <div>
                        <div style={{marginTop:'50%', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100%', flexWrap:'wrap'}}>
                            <ReserveSeatsButton 
                                sessionId={sessionId} 
                                seatData={this.state.selectedSeats}     
                                onDone={()=>this.setState({selectedSeats:[]})}                            
                            />
                            <FreeSeatsButton 
                                seatData={this.state.selectedSeats} 
                                onDone={()=>this.setState({selectedSeats:[]})}
                            />
                            <Button 
                                context="dark" 
                                onClick={()=>this.setState({selectedSeats:[]})}
                                disabled={this.state.selectedSeats.length === 0}
                            >
                                DESELECCIONAR TODO
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Segment secondary>
                            <h2 style={{textAlign:'center'}}>PRECIOS ASIGNADOS</h2>
                        </Segment>
                        <SeatPricesTable sessionId={this.props.sessionId} />
                        <Segment secondary>
                            <h2 style={{textAlign:'center'}}>ASIGNAR RESERVAS</h2>
                        </Segment>
                        <SeatReservesTable onlyInfinites sessionId={this.props.sessionId} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ( store, props ) => {
        const recintData = ExtractRecintDataFromStore( store )

        return {
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats,
            zoneTables: BuildZoneTables( store.seatrows.data, store.seatprices.data )
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch ),
            fetchSales: bindActionCreators( SaleActions.fetch, dispatch )
        }
    }
)(RecintTicketsConfigurator)
import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPriceRenderer from '../seatPriceRenderer/SeatPriceRenderer'
import Button from '../ui/button/Button'

import { connect } from 'react-redux'
import  { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import { crud as ReservesActions } from '../../redux/actions/seatreserves'
import { crud as SeatPricesActions } from '../../redux/actions/seatprices'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'
import moment from 'moment'

class ZonedTicketOfficeController extends React.Component {
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
            fetchSeatPrices 
        } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
        fetchSeatPrices( '?session='+sessionId )
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.toSelection ) {
            if( !this.isSeatInArray( this.state.selectedSeats, nextProps.toSelection ) ) {
                this.selectSeat(
                    nextProps.toSelection.zoneId,
                    nextProps.toSelection.row,
                    nextProps.toSelection.seatIndex,
                    nextProps.toSelection.seatNumber,
                    nextProps.toSelection.position,
                    nextProps.toSelection.seatState
                )
            }
        }
        if( nextProps.toDeselect ) {
            if( this.isSeatInArray( this.state.selectedSeats, nextProps.toDeselect ) ) {
                this.deselectSeat( nextProps.toDeselect.index )
            }
        }
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

    deselectAll() {
        this.state.selectedSeats.forEach( selected => {
            this.voidReserve( selected.seatState.reserve_id, selected )
        })
    }

    deselectSeat( index ) {
        let selectedSeats = [...this.state.selectedSeats]
        selectedSeats.splice( index, 1 )
        for( let i = index; i < selectedSeats.length; i++ ) {
            selectedSeats[ i ].index--
        }
        this.setState({selectedSeats})
    }

    selectSeat( zoneId, row, seatIndex, seatNumber, position, seatState ) {
        const selectedSeats = [...this.state.selectedSeats]
        const seatData = {
            index: selectedSeats.length,
            zoneId,
            zone: this.props.zones.get( parseInt(zoneId,10) ).zone,
            row,
            seatIndex,
            seatNumber,
            position,
            seatState
        }
        //const seatStored = this.isSeatInArray( selectedSeats, seatData ) 
        selectedSeats.push( seatData )
        /*
        if( seatStored === null ) {
            if( seatState.state === 'LIBRE' ) {
            }
        } else {
            return this.deselectSeat( seatStored.index )
        }*/
        
        this.setState({selectedSeats})
    }

    voidReserve( id, toDeselect ) {
        this.props.removeReserve( id, {
            toDeselect
        })
    }

    clickedSeat( zoneId, row, seatIndex, seatNumber, position, seatState ) {
        const { createReserve, sessionId, me } = this.props
        const seatData = {
            zoneId,
            row,
            seatIndex,
            seatNumber,
            position,
            seatState
        }
        const seatStored = this.isSeatInArray( this.state.selectedSeats, seatData )         
        if( seatState.state === 'LIBRE' && !seatStored ) {
            createReserve(
                {
                    session_id: sessionId,
                    zone_id: zoneId,
                    seat_row: row,
                    seat_index: seatIndex,
                    user_id: me.id,
                    expires_at: moment.utc( moment().add( 5, 'm' ) ).format()
                }, 
                '', 
                {
                    toSelection: seatData
                }
            )
        } else {
            if( parseInt(seatState.reservedBy, 10) === parseInt(me.id, 10) ) {
                if( seatStored ) { //deselect and void reserve
                    this.voidReserve( seatState.reserve_id, seatStored )
                } else { //add to selection, already reserved
                    this.selectSeat(
                        seatData.zoneId,
                        seatData.row,
                        seatData.seatIndex,
                        seatData.seatNumber,
                        seatData.position,
                        seatState
                    )
                }
            }
        }           
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

    render() {
        const { plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        return(
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                <div>
                    <RecintRenderer
                            plane={plane}
                            zones={zones}
                            polygons={polygons}
                            rows={seats}
                            showSeatState
                            showOnlyPriced
                            onSeatHover={ this.showSeatPrice.bind(this) }
                            onSeatHoverExit={()=>this.setState({seatInfo:null})}
                            onSeatClick={this.clickedSeat.bind(this)}
                            seatsSelected={this.state.selectedSeats}
                    >
                        {this.state.seatInfo}
                    </RecintRenderer>
                </div>
                <div>
                    <Button disabled={this.state.selectedSeats.length === 0} onClick={()=>this.deselectAll()} context="negative">DESELECCIONAR</Button>
                    <Button disabled={this.state.selectedSeats.length === 0} context="possitive">COMPRAR</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        const recintData = ExtractRecintDataFromStore( store )

        return {
            me: store.auth.me,
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats,
            seatprices: store.seatprices.data,
            seatreserves: store.seatreserves.data,
            toSelection: store.seatreserves.toSelection,
            toDeselect: store.seatreserves.toDeselect
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch ),
            fetchSeatPrices: bindActionCreators( SeatPricesActions.fetch, dispatch ),
            createReserve: bindActionCreators( ReservesActions.create, dispatch ),
            removeReserve: bindActionCreators( ReservesActions.delete, dispatch )
        }
    }
)(ZonedTicketOfficeController)
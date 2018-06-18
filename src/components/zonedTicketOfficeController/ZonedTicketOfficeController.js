import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPriceRenderer from '../seatPriceRenderer/SeatPriceRenderer'

import { connect } from 'react-redux'
import  { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import { crud as ReservesActions } from '../../redux/actions/seatreserves'
import { crud as SeatPricesActions } from '../../redux/actions/seatprices'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'

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

    clickedSeat( zoneId, row, seatIndex, seatNumber, position, seatState ) {
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
            if( seatState.state === 'LIBRE' ) {
                selectedSeats.push( seatData )
            }
        } else {
            return this.deselectSeat( seatStored.index )
        }
        
        this.setState({selectedSeats})
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
        const { sessionId, plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        return(
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
        )
    }
}

export default connect(
    ( store ) => {
        const recintData = ExtractRecintDataFromStore( store )

        return {
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats,
            seatprices: store.seatprices.data,
            seatreserves: store.seatreserves.data,
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch ),
            fetchSeatPrices: bindActionCreators( SeatPricesActions.fetch, dispatch )
        }
    }
)(ZonedTicketOfficeController)
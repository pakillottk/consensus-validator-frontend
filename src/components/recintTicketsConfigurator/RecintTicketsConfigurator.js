import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPricesTable from '../entitites/seatprices/SeatPricesTable'
import SeatPriceRenderer from '../seatPriceRenderer/SeatPriceRenderer'
import Segment from '../ui/segment/Segment'
import Table from '../ui/table/Table'
import Button from '../ui/button/Button'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import { crud as ReservesActions } from '../../redux/actions/seatreserves'
import ReserveSeatsButton from '../reserveSeatsButton/ReserveSeatsButton'
import FreeSeatsButton from '../freeSeatsButton/FreeSeatsButton'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'

class RecintTicketsConfigurator extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null,
            selectedSeats: []
        }
    }

    componentWillMount() {
        const { sessionId, fetchZones, fetchPolygons, fetchSeats, fetchReserves } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
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

    render() {
        const { sessionId, plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        return(
            <div>
                <div>                       
                    <Segment secondary>
                        <h2 style={{textAlign:'center'}}>ASIENTOS SELECCIONADOS</h2>
                    </Segment>       
                    <div style={{display:'flex', justifyContent:'center', width:'100%', flexWrap:'wrap'}}>
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
                <div style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                    <RecintRenderer
                        plane={plane}
                        zones={zones}
                        polygons={polygons}
                        rows={seats}
                        onSeatHover={ this.showSeatPrice.bind(this) }
                        onSeatHoverExit={()=>this.setState({seatInfo:null})}
                        onSeatClick={ this.seatSelected.bind( this ) }
                        showSeatState
                        seatsSelected={this.state.selectedSeats}
                    >
                        {this.state.seatInfo}
                    </RecintRenderer>
                    <div>
                        <SeatPricesTable sessionId={this.props.sessionId} />
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
            seats: recintData.seats
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch )
        }
    }
)(RecintTicketsConfigurator)
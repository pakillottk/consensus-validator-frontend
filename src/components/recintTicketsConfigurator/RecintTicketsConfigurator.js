import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPricesTable from '../entitites/seatprices/SeatPricesTable'
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
import CalcSeatPrice from '../../entities/SeatPrices/CalcSeatPrice'
import GetSeatState from '../../entities/SeatReserves/GetSeatState'


class RecintTicketsConfigurator extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null,
            selectedSeats: []
        }

        this.seatSelectedTableFields = [
            {
                name:'zone',
                label:'ZONA'
            },
            {
                name:'row',
                label:'FILA'
            },
            {
                name:'seatNumber',
                label:'ASIENTO'
            },
            {
                name:'index',
                label:'ACCIONES',
                displayFormat: ( index ) => {
                    return(
                        <Button context="negative" onClick={() =>{ this.deselectSeat(index) }}>
                            QUITAR DE LA SELECCIÓN
                        </Button>
                    )
                }
            }
        ]
    }

    componentWillMount() {
        const { sessionId, fetchZones, fetchPolygons, fetchSeats, fetchReserves } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
    }

    showSeatPrice( zoneId, row, seatIndex, seatNumber, position ) {
        const { seatprices, seatreserves } = this.props
        const type = CalcSeatPrice( zoneId, seatprices, row, seatIndex )
        const seatState = GetSeatState(seatreserves, zoneId, row, seatIndex )
        this.setState({seatInfo:(
            <div 
                className="appears-from-bottom"
                style={{
                    pointerEvents:'none',
                    position: 'absolute', 
                    top: position.y - 50, 
                    left: position.x - 50,
                    maxWidth:'100px',
                    padding:'5px',
                    color:'white', 
                    textAlign:'center',
                    background:'rgba(0,0,0,0.7)',
                    zIndex:20,
                    fontSize:'0.6rem'
                }}
            >
                { type === null && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA:{row} ASIENTO:{seatNumber}</p>
                        <p>SIN PRECIO ASIGNADO</p>
                        <p style={{color:'yellow'}}>NO ESTÁ EN VENTA</p>
                    </div>) 
                }
                { type && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA: <b>{row}</b> ASIENTO: <b>{seatNumber}</b></p>
                        <p>{type.type} ({type.price}€)</p>
                        <p style={{color:seatState.color}}>{seatState.state}</p>
                    </div>)
                }
            </div>
        )})
    }

    isSeatInArray( seatsArray, seatData ) {
        return seatsArray.some( seat => {
            return seat.zoneId === seatData.zoneId &&
                   seat.row === seatData.row &&
                   seat.seatIndex === seatData.seatIndex
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
        if( !this.isSeatInArray( selectedSeats, seatData ) ) {
            selectedSeats.push( seatData )
        }
        
        this.setState({selectedSeats})
    }

    render() {
        const { sessionId, plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        return(
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
                    <div>                        
                        <Segment secondary>
                            <h2 style={{textAlign:'center'}}>ASIENTOS SELECCIONADOS</h2>
                        </Segment>       
                        <div style={{display:'flex', width:'100%', flexWrap:'wrap'}}>
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
                        <Table
                            full
                            fields={this.seatSelectedTableFields}
                            items={this.state.selectedSeats}
                        />                 
                    </div>
                    <SeatPricesTable sessionId={this.props.sessionId} />
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
            seatprices: store.seatprices.data,
            seatreserves: store.seatreserves.data
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
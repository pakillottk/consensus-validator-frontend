import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPricesTable from '../entitites/seatprices/SeatPricesTable'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'
import CalcSeatPrice from '../../entities/SeatPrices/CalcSeatPrice'

class RecintTicketsConfigurator extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null
        }
    }

    componentWillMount() {
        const { sessionId, fetchZones, fetchPolygons, fetchSeats } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
    }

    showSeatPrice( zoneId, row, seatIndex, seatNumber, position ) {
        const { seatprices } = this.props
        const type = CalcSeatPrice( zoneId, seatprices, row, seatIndex )
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
                    </div>) 
                }
                { type && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA: {row} ASIENTO: {seatNumber}</p>
                        <p>{type.type} ({type.price}€)</p>
                    </div>)
                }
            </div>
        )})
    }

    render() {
        const { plane, zones, polygons, seats } = this.props
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
                >
                    {this.state.seatInfo}
                </RecintRenderer>
                <SeatPricesTable sessionId={this.props.sessionId} />
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
            seatprices: store.seatprices.data
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch )
        }
    }
)(RecintTicketsConfigurator)
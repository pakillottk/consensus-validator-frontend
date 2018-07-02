import React from 'react'

import RecintRenderer from '../components/recintRenderer/RecintRenderer'
import Segment from '../components/ui/segment/Segment'

import { connect } from 'react-redux'
import  { bindActionCreators } from 'redux'
import { crud as SessionActions } from '../redux/actions/sessions'
import { crud as ZoneActions } from '../redux/actions/recintzones'
import { crud as PolygonActions } from '../redux/actions/zonepolygons'
import { crud as SeatActions } from '../redux/actions/seatrows'
import { crud as ReservesActions } from '../redux/actions/seatreserves'
import { crud as SeatPricesActions } from '../redux/actions/seatprices'

import ExtractRecintDataFromStore from '../entities/Recints/ExtractRecintDataFromStore'
import moment from 'moment'

import io from 'socket.io-client'
import SocketConnection from '../API/SocketConnection'

class RecintStateMonitorPage extends React.Component {
    componentWillMount() {
        const {  
            fetchSession,         
            fetchZones, 
            fetchPolygons, 
            fetchSeats, 
            fetchReserves,
            fetchSeatPrices
        } = this.props
        const sessionId = parseInt( this.props.match.params.id, 10 )

        fetchSession( sessionId )
        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
        fetchSeatPrices( '?session='+sessionId )

        this.io = io( SocketConnection.basePath() )
        this.io.emit( 'join', {room: sessionId + '-session'} )
        this.io.on( 'seatreserve_created', ( data ) => {
            this.props.createReserveLocal( data )            
        })

        this.io.on( 'seatreserve_updated', ( data ) => {            
            this.props.updateReserveLocal( data.id, data )            
        })

        this.io.on( 'seatreserve_deleted', ( data ) => {
            this.props.removeReserveLocal( data.id )            
        })
    }

    componentWillUnmount() {
        this.io.disconnect()
    }

    render() {
        const { session, zones, polygons, seats } = this.props
        if( !session ) {
            return null
        }
        if( session.ticketing_flow === 'by_types' ) {
            return(
                <div style={{width:'100%',height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <h1 style={{color:'red', fontSize:'3rem'}}>ESTA FUNCIÓN SOLO ES VÁLIDA PARA VENTA POR ZONAS</h1>
                </div>
            )
        }
        return (
            <div style={{background:'white', position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:999}}>
                <Segment secondary styles={{padding: 0}}>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }
                </Segment>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <RecintRenderer
                        plane={session.recint_plane}
                        zones={zones}
                        polygons={polygons}
                        rows={seats}                
                        showSeatState  
                        showOnlyPriced              
                    />
                </div>
            </div>
        )
    }
}
export default connect(
    ( store, props ) => {
        const sessionId = parseInt( props.match.params.id, 10 )
        const recintData = ExtractRecintDataFromStore( store )
        return {
            session: store.sessions.data.get( sessionId ),
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats,
            seatreserves: store.seatreserves.data,
        }
    },
    ( dispatch ) => {
        return {
            fetchSession: bindActionCreators( SessionActions.fetchById, dispatch ),
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch ),
            fetchSeatPrices: bindActionCreators( SeatPricesActions.fetch, dispatch ),
            createReserveLocal: bindActionCreators( ReservesActions.create_local, dispatch ),
            updateReserveLocal: bindActionCreators( ReservesActions.update_local, dispatch ),
            removeReserveLocal: bindActionCreators( ReservesActions.delete_local, dispatch ),
        }
    } 
)(RecintStateMonitorPage)
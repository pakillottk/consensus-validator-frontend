import React from 'react'

import Button from '../components/ui/button/Button'
import Divider from '../components/ui/divider/Divider'
import Segment from '../components/ui/segment/Segment'

import ScanSummary from '../components/scanSummary/ScanSummary'
import SalesSummary from '../components/salesSummary/SalesSummary'
import LogEntriesTable from '../components/entitites/logentries/LogEntriesTable'

import { crud } from '../redux/actions/sessions'
import { crud as SaleActions } from '../redux/actions/sales'
import { crud as TypeActions } from '../redux/actions/types'
import { crud as PaymentActions } from '../redux/actions/payments'
import { crud as ComissionActions } from '../redux/actions/comissions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment'
import 'moment/locale/es'

import io from 'socket.io-client'
import SocketConnection from '../API/SocketConnection'

class MonitorPage extends React.Component {
    componentWillMount() {
        const sessionId = this.props.match.params.id

        this.io = io( SocketConnection.basePath() )
        this.io.emit( 'join', {room: sessionId + '-session'} )

        this.io.on( 'sale_added', ( data ) => {
            this.props.createSale( data )
        })

        this.io.on( 'log_entry_added', ( data ) => {
            this.props.createLogEntry( data )
        })

        this.io.on( 'code_added', ( data ) => {
            this.props.createCode( data )
        })

        this.io.on( 'code_updated', ( data ) => {
            this.props.updateCode( data )
        })
        
        this.props.fetchById( sessionId )
        this.props.fetchSales( '?session=' + sessionId )
        this.props.fetchTypes( '?session=' + sessionId )
        this.props.fetchPayments( '?session=' + sessionId )
        this.props.fetchComissions( '?session=' + sessionId )
    }

    componentWillUnmount() {
        this.io.disconnect()
    }

    render() {
        const { session } = this.props
        const sessionId = parseInt( this.props.match.params.id )

        if( !session ) {
            return(
                <div>
                    <Segment secondary>
                        <h1>LA SESIÓN NO EXISTE O NO ESTÁ AUTORIZADO</h1>
                    </Segment>
                </div>
            )
        }

        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">MONITOR</h1>                
                </Segment>
                <Segment>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                    <Divider full/>

                    <Segment secondary styles={{border:'none'}}>
                        <h2 style={{textAlign: 'center'}}>SEGUIMIENTO ACCESOS</h2>
                    </Segment>
                    <ScanSummary sessionId={sessionId} />

                    <Segment secondary styles={{border:'none'}}>
                        <h2 style={{textAlign: 'center'}}>SEGUIMIENTO VENTAS</h2>
                    </Segment>
                    <SalesSummary sessionId={sessionId} />

                    <Segment secondary styles={{border:'none'}}>
                        <h2 style={{textAlign: 'center'}}>HISTORIA</h2>
                    </Segment>
                    <LogEntriesTable sessionId={sessionId} />
                </Segment>
            </div>
        )
    }
}
export default connect(
    ( store, props ) => {
        return {
            session: store.sessions.data.get( parseInt( props.match.params.id ) )
        }
    },
    ( dispatch ) => {
        return {
            fetchById: bindActionCreators( crud.fetchById, dispatch ),
            fetchSales: bindActionCreators( SaleActions.fetch, dispatch ),
            fetchTypes: bindActionCreators( TypeActions.fetch, dispatch ),
            fetchPayments: bindActionCreators( PaymentActions.fetch, dispatch ),
            fetchComissions: bindActionCreators( ComissionActions.fetch, dispatch ),
            createSale: bindActionCreators( ( data ) => {
                return {
                    type: 'SALES_CREATE_FULFILLED',
                    payload: {data: data}
                }
            }, dispatch ),
            createLogEntry: bindActionCreators( ( data ) => {
                return {
                    type: 'LOGENTRIES_CREATE_FULFILLED',
                    payload: { data: data }
                }
            }, dispatch ),
            createCode: bindActionCreators( ( data ) => {
                return {
                    type: 'CODES_CREATE_FULFILLED',
                    payload: { data: data }
                }
            }, dispatch),
            updateCode: bindActionCreators( ( data ) => {
                return {
                    type: 'CODES_UPDATE_FULFILLED',
                    payload: {data: data}
                }
            }, dispatch)
        }
    }
)(MonitorPage)
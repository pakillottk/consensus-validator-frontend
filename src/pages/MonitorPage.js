import React from 'react'

import Button from '../components/ui/button/Button'
import Divider from '../components/ui/divider/Divider'
import Segment from '../components/ui/segment/Segment'

import LogEntriesTable from '../components/entitites/logentries/LogEntriesTable'

import { crud } from '../redux/actions/sessions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment'
import 'moment/locale/es'

class MonitorPage extends React.Component {
    componentWillMount() {
        this.props.fetchById( this.props.match.params.id )
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
            fetchById: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)(MonitorPage)
import React from 'react';

import { Supervisor, Seller } from '../components/auth/authLevels'
import Button from '../components/ui/button/Button'
import Divider from '../components/ui/divider/Divider'
import Segment from '../components/ui/segment/Segment'
import { crud } from '../redux/actions/sessions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment'
import 'moment/locale/es'

const SupervisorButton = Supervisor( Button, true )
const SellerButton = Seller( Button, true )

class SessionPage extends React.Component {
    componentWillMount() {
        this.props.fetchById( this.props.match.params.id )
    }

    render() {
        const { session } = this.props
        const id = this.props.match.params.id

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
                    <h1 className="center-aligned">SESIONES</h1>                
                </Segment>
                <Segment>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                    <Divider full/>

                    <SupervisorButton full onClick={() => this.props.history.push('/sesiones/' + id + '/administrar')}> ADMINISTRAR </SupervisorButton>
                    <SupervisorButton onClick={() => this.props.history.push('/sesiones/' + id + '/monitor')} context="relevant" full> MONITOR </SupervisorButton>
                    <SellerButton onClick={() => this.props.history.push('/sesiones/' + id + '/taquilla')} context="possitive" full> TAQUILLA </SellerButton> 
                </Segment>
            </div>
        );
    }
}

export default connect(
    ( store, props ) => {
        return {
            session: store.sessions.data.get( parseInt( props.match.params.id, 10 ) )
        }
    },
    ( dispatch ) => {
        return {
            fetchById: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)(SessionPage)
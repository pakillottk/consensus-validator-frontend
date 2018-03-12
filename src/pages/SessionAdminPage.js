import React from 'react';

import Segment from '../components/ui/segment/Segment'
import SessionsTable from '../components/entitites/sessions/SessionsTable'
import SessionForm from '../components/entitites/sessions/SessionForm'

import NewTypeButton from '../components/entitites/types/NewTypeButton'
import TypesTable from '../components/entitites/types/TypesTable'
import NewDeliverButton from '../components/entitites/deliveries/NewDeliverButton'
import DeliveriesTable from '../components/entitites/deliveries/DeliveriesTable'
import NewScanGroupButton from '../components/entitites/scangroups/NewScanGroupButton'
import ScanGroupsTable from '../components/entitites/scangroups/ScanGroupsTable'
import ScanTypesTable from '../components/entitites/scantypes/ScanTypesTable'

import { crud } from '../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SessionAdminPage extends React.Component {
    componentWillMount() {
        const sessionId = this.props.match.params.id;
        this.props.fetch( sessionId )
    }

    render() {
        const { session } = this.props
        const sessionId = parseInt( this.props.match.params.id );
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
                    <h1 className="center-aligned">ADMINISTRAR SESIÓN</h1>
                </Segment>
                <Segment>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Segment>
                            <SessionForm id={ sessionId } />
                        </Segment>
                        <Segment>
                            <h2 style={{textAlign: 'center'}}>TIPOS</h2>
                            <NewTypeButton sessionId={sessionId} />
                            <TypesTable sessionId={ sessionId } />
                        </Segment>
                        <Segment>
                            <h2 style={{textAlign: 'center'}}>ENTREGAS</h2>
                            <NewDeliverButton />
                            <DeliveriesTable sessionId={sessionId} />
                        </Segment>
                        <Segment>
                            <h2 style={{textAlign: 'center'}}>GRUPOS DE ESCANEO</h2>
                            <NewScanGroupButton sessionId={sessionId} />
                            <ScanGroupsTable sessionId={sessionId} />
                        </Segment>
                        <Segment>
                            <h2 style={{textAlign: 'center'}}>TIPOS ESCANEABLES</h2>
                            <ScanTypesTable />
                        </Segment>
                    </div>
                </Segment>
            </div>
        );
    }
}

export default connect(
    ( store, props ) => { 
        return {
            session: store.sessions.data.get( parseInt( props.match.params.id ) )
        }; 
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)( SessionAdminPage )
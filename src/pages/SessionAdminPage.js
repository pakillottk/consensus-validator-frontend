import React from 'react';

import Segment from '../components/ui/segment/Segment'
import SessionsTable from '../components/entitites/sessions/SessionsTable'
import SessionForm from '../components/entitites/sessions/SessionForm'

import NewTypeButton from '../components/entitites/types/NewTypeButton'
import TypesTable from '../components/entitites/types/TypesTable'


import { crud } from '../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SessionAdminPage extends React.Component {
    componentWillMount() {
        const sessionId = this.props.match.params.id;
        this.props.fetch( sessionId )
    }

    render() {
        const sessionId = parseInt( this.props.match.params.id );
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
                    </div>
                </Segment>
            </div>
        );
    }
}

export default connect(
    () => { return {}; },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)( SessionAdminPage )
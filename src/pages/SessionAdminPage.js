import React from 'react';

import Segment from '../components/ui/segment/Segment'
import SessionsTable from '../components/entitites/sessions/SessionsTable'
import SessionForm from '../components/entitites/sessions/SessionForm'

export default class SessionAdminPage extends React.Component {
    render() {
        return(
            <div>
            <Segment secondary styles={{border:'none'}}>
                <h1 className="center-aligned">ADMINISTRAR SESIÓN</h1>
            </Segment>
            <Segment >
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <SessionForm id={ parseInt( this.props.match.params.id ) } />
                </div>
            </Segment>
        </div>
        );
    }
}
import React from 'react';

import Segment from '../components/ui/segment/Segment'
import SessionsTable from '../components/entitites/sessions/SessionsTable'
import NewSessionButton from '../components/entitites/sessions/NewSessionButton'

export default class SessionsPage extends React.Component {
    goToSessionPage( session ) {
        this.props.history.push( '/sesiones/' + session.id )
    }

    render() {
        return(
            <div>
            <Segment secondary styles={{border:'none'}}>
                <h1 className="center-aligned">SESIONES</h1>
            </Segment>
            <Segment styles={{padding: 0}}>
                <NewSessionButton styles={{margin: 'none'}} full />
                <SessionsTable onItemClick={ ( item ) => this.goToSessionPage( item ) } />
            </Segment>
        </div>
        );
    }
}
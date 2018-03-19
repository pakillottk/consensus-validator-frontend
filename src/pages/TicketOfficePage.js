import React from 'react';

import Segment from '../components/ui/segment/Segment'
import TicketOfficeController from '../components/ticketOfficeController/TicketOfficeController' 

export default class TicketOfficePage extends React.Component {
    render() {
        const sessionId = parseInt( this.props.match.params.id );
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">TAQUILLA</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <TicketOfficeController sessionId={sessionId} />
                </Segment>
            </div>
        );
    }
}
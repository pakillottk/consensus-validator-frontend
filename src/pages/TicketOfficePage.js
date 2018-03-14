import React from 'react';

import Segment from '../components/ui/segment/Segment'

export default class TicketOfficePage extends React.Component {
    render() {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">TAQUILLA</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    
                </Segment>
            </div>
        );
    }
}
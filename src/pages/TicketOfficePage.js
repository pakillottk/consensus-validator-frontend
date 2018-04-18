import React from 'react';

import Segment from '../components/ui/segment/Segment'
import Divider from '../components/ui/divider/Divider'
import TicketOfficeController from '../components/ticketOfficeController/TicketOfficeController' 
import { connect } from 'react-redux'
import moment from 'moment'

class TicketOfficePage extends React.Component {
    render() {
        const sessionId = parseInt( this.props.match.params.id );
        const session = this.props.sessions.get( sessionId );
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">TAQUILLA</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                    <Divider full/>

                    <TicketOfficeController sessionId={sessionId} />
                </Segment>
            </div>
        );
    }
}

export default connect( ( store, props ) =>  {
    return {
        sessions: store.sessions.data
    }
})( TicketOfficePage )
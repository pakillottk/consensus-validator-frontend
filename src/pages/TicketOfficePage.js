import React from 'react';

import Segment from '../components/ui/segment/Segment'
import Divider from '../components/ui/divider/Divider'
import TicketOfficeController from '../components/ticketOfficeController/TicketOfficeController' 
import { connect } from 'react-redux'
import moment from 'moment'

import PaymentFilters from '../components/entitites/payments/PaymentFilters'
import NewPaymentButton from '../components/entitites/payments/NewPaymentButton'
import PaymentsTable from '../components/entitites/payments/PaymentsTable'

class TicketOfficePage extends React.Component {
    render() {
        const sessionId = parseInt( this.props.match.params.id );
        const session = this.props.sessions.get( sessionId );
        if( session ) {
            const meRole = this.props.meRole;
            const now = new Date();
            const sellers_locked_at = new Date( session.sellers_locked_at );
            const ticketoffice_closed_at = new Date( session.ticketoffice_closed_at );
            if( 
                ( meRole === 'seller' && now > sellers_locked_at ) || 
                ( now > ticketoffice_closed_at )
            ) {
                return(
                    <div>
                        <Segment secondary styles={{border:'none'}}>
                            <h1 className="center-aligned">TAQUILLA</h1>
                        </Segment>
                        <Segment secondary styles={{padding: 0}}>
                            { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                            { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                            { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                            <Divider full/>

                            <h1 style={{color:'red', textAlign:'center'}}>LA VENTA ESTÁ CERRADA</h1>
                        </Segment>
                    </div>
                );
            }
        }

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

                    <PaymentFilters sessionId={sessionId} />
                    <NewPaymentButton sessionId={sessionId} />
                    <PaymentsTable sessionId={sessionId} />
                </Segment>
            </div>
        );
    }
}

export default connect( ( store, props ) =>  {
    return {
        meRole: store.auth.me.role,
        sessions: store.sessions.data
    }
})( TicketOfficePage )
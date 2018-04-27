import React from 'react'

import NewEntityButton from '../NewEntityButton'
import PaymentForm from './PaymentForm'
import Auth from '../../auth/authorization'

export default class NewPaymentButton extends React.Component {
    attachSessionId( data, mode ) {
        data.session_id = this.props.sessionId;
        return data;
    }

    render() {
        return(
            <NewEntityButton 
                AuthLevel={Auth(['seller', 'ticketoffice-manager'])}
                title="NUEVO PAGO" 
                dataTransformer={this.attachSessionId.bind(this)} 
                Form={PaymentForm} 
                full 
                styles={{margin: 0}}
            />
        )
    }
}
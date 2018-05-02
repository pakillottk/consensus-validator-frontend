import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/payments'
import PaymentValidator from '../../forms/Validators/PaymentValidator'
import RemovePaymentButton from './RemovePaymentButton'

const Form = EntityForm( 'payments', crud, Schema, 'PAGO', PaymentValidator )
export default class CompanyForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} dataTransformer={dataTransformer} hidden={{user_id: true, username: true, created_at: true}} multipart={true} />  
                { this.props.id && <RemovePaymentButton id={this.props.id} /> }
            </div>
        ) 
    }
}
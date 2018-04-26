import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/payments'
import RemovePaymentButton from './RemovePaymentButton'

const Form = EntityForm( 'payments', crud, Schema, 'PAGO' )
export default class CompanyForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} dataTransformer={dataTransformer} hidden={{created_at: true}} multipart={true} />  
                { this.props.id && <RemovePaymentButton id={this.props.id} /> }
            </div>
        ) 
    }
}
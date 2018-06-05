import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/recints'
import RecintValidator from '../../forms/Validators/RecintValidator'
//import RemovePaymentButton from './RemovePaymentButton'

const Form = EntityForm( 'recints', crud, Schema, 'RECINTO', RecintValidator )
export default class RecintForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} multipart={true} dataTransformer={dataTransformer} />  
            </div>
        ) 
    }
}
import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/recintzones'
import RecintZoneValidator from '../../forms/Validators/RecintZoneValidator'
//import RemovePaymentButton from './RemovePaymentButton'

const Form = EntityForm( 'recintzones', crud, Schema, 'ZONA', RecintZoneValidator )
export default class RecintForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} hidden={{recint_id: true}} dataTransformer={dataTransformer} />  
            </div>
        ) 
    }
}
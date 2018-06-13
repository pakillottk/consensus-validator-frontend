import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/recints'
import RecintValidator from '../../forms/Validators/RecintValidator'
import RemoveRecintButton from './RemoveRecintButton'

const Form = EntityForm( 'recints', crud, Schema, 'RECINTO', RecintValidator )
export default class RecintForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} multipart={true} dataTransformer={dataTransformer} />  
                { this.props.id && <RemoveRecintButton id={this.props.id} /> }
            </div>
        ) 
    }
}
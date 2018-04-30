import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/comissions'
import RemoveComissionButton from './RemoveComissionButton'

const Form = EntityForm( 'comissions', crud, Schema, 'COMISIÓN' )
export default class ComissionsForm extends React.Component {
    render() {        
        const { dataTransformer } = this.props
        return(
            <div>
                <Form id={this.props.id} dataTransformer={dataTransformer} hidden={{username: true, session_id: true}} />  
                { this.props.id && <RemoveComissionButton id={this.props.id} /> }
            </div>
        ) 
    }
}
import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'
import RemoveSessionButton from './RemoveSessionButton'

import { crud } from '../../../redux/actions/sessions'

const Form = EntityForm( 'sessions', crud, Schema, 'SESIÓN' )
export default class SessionForm extends React.Component {
    render() {        
        return(
            <div>
                <Form id={this.props.id} />  
                { this.props.id && <RemoveSessionButton id={this.props.id} /> }
            </div>
        ) 
    }
}
import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'
import SessionValidator from '../../forms/Validators/SessionValidator'
import RemoveSessionButton from './RemoveSessionButton'

import { crud } from '../../../redux/actions/sessions'

const Form = EntityForm( 'sessions', crud, Schema, 'SESIÓN', SessionValidator )
export default class SessionForm extends React.Component {
    render() {        
        return(
            <div>
                <Form id={this.props.id} hidden={{company_id: true}}/>  
                { this.props.id && <RemoveSessionButton id={this.props.id} /> }
            </div>
        ) 
    }
}
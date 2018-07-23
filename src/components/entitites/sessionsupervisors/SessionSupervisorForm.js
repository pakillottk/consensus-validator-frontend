import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/sessionsupervisors'
import RemoveSessionSupervisorButton from './RemoveSessionSupervisorButton'

const Form = EntityForm( 'sessionsupervisors', crud, Schema, 'SUPERVISOR AUTORIZADO' )
export default class SessionForm extends React.Component {
    render() { 
        const { id, dataTransformer } = this.props       
        return(
            <div>
                <Form id={id} hidden={{session_id: true, user: true}} dataTransformer={dataTransformer} />  
                {id && <RemoveSessionSupervisorButton id={id} />}
            </div>
        ) 
    }
}
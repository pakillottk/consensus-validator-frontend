import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'
import SessionValidator from '../../forms/Validators/SessionValidator'
import RemoveSessionButton from './RemoveSessionButton'

import { crud } from '../../../redux/actions/sessions'
import moment from 'moment'

const Form = EntityForm( 'sessions', crud, Schema, 'SESIÓN', SessionValidator )
export default class SessionForm extends React.Component {
    transformer( data, isUpdate ) {
        if( data.date ) {
            data.date = moment.isMoment(data.date) ? data.date.toISOString() : data.date;
        }
        if( data.sellers_locked_at ) {
            data.sellers_locked_at = moment.isMoment(data.sellers_locked_at) ? data.sellers_locked_at.toISOString() : data.sellers_locked_at;
        }
        if( data.ticketoffice_closed_at ) {
            data.ticketoffice_closed_at = moment.isMoment(data.ticketoffice_closed_at) ? data.ticketoffice_closed_at.toISOString() : data.ticketoffice_closed_at;
        }

        return data;
    }

    render() {        
        return(
            <div>
                <Form id={this.props.id} hidden={{recint: true, location: true}} dataTransformer={ this.transformer.bind( this ) } />  
                { this.props.id && <RemoveSessionButton id={this.props.id} /> }
            </div>
        ) 
    }
}
import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'
import UserValidator from '../../forms/Validators/UserValidator'

import { crud } from '../../../redux/actions/users'
import RemoveUserButton from './RemoveUserButton'

const Form = EntityForm( 'users', crud, Schema, 'USUARIO', UserValidator )
export default class UserForm extends React.Component {
    dataTransformer( data ) {
        if( data.company_id === 0 ) {
            delete data.company_id
        }

        return data
    }

    render() {        
        return( 
            <div>
                <Form id={this.props.id} dataTransformer={this.dataTransformer.bind(this)} hidden={{company: true, role: true}} />
                { this.props.id && <RemoveUserButton id={this.props.id} />}
            </div>
        )
    }
}
import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/users'
import RemoveUserButton from './RemoveUserButton'

const Form = EntityForm( 'users', crud, Schema, 'USUARIO' )
export default class UserForm extends React.Component {
    render() {        
        return( 
            <div>
                <Form id={this.props.id} hidden={{company: true, role: true}} />
                { this.props.id && <RemoveUserButton id={this.props.id} />}
            </div>
        )
    }
}
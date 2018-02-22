import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/users'

const Form = EntityForm( 'users', crud, Schema, 'USUARIO' )
export default class UserForm extends React.Component {
    render() {        
        return <Form id={this.props.id} hidden={{company: true, role: true}} disabled={{company_id: true}} />
    }
}
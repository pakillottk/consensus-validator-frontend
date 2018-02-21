import React from 'react'

import { crud } from '../../../redux/actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import UserForm from './UserForm'

class UsersTable extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    render() {
        const { users } = this.props
        return(
            <EntityTable
                schema={schema}
                items={users}
                hidden={{password: true, company_id: true, role_id: true}}
                formTitle="EDITAR USUARIO"
                Form={UserForm}
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            users: store.users.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(UsersTable)
import React from 'react'

import { crud } from '../../../redux/actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class UsersTable extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    render() {
        return(
            <div>
                TABLE
            </div>
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
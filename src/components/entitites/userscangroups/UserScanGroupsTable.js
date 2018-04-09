import React from 'react'

import { crud } from '../../../redux/actions/userscangroups'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import UserScanGroupForm from './UserScanGroupForm'
import NewUserScanGroupButton from './NewUserScanGroupButton'

class UserScanGroupsTable extends React.Component {
    constructor( props ) {
        super( props )
    }

    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { userscangroups } = this.props
        return(
            <div>
                <NewUserScanGroupButton />
                <EntityTable
                    schema={schema}
                    items={userscangroups}
                    hidden={{user_id: true, group_id: true}}
                    formTitle="ASIGNAR GRUPO ESCANEO"
                    Form={UserScanGroupForm}
                    full
                />
            </div>
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            userscangroups: store.userscangroups.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(UserScanGroupsTable)
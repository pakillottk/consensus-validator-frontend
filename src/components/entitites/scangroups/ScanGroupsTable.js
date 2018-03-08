import React from 'react'

import { crud } from '../../../redux/actions/scangroups'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import ScanGroupForm from './ScanGroupForm'

class ScanGroupsTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { scangroups } = this.props
        return(
            <EntityTable
                schema={schema}
                items={scangroups}
                hidden={{session_id: true}}
                formTitle="EDITAR GRUPO DE ESCANEO"
                Form={ScanGroupForm}
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            scangroups: store.scangroups.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(ScanGroupsTable)
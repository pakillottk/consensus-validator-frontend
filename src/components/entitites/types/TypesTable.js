import React from 'react'

import { crud } from '../../../redux/actions/types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import TypeForm from './TypeForm'

class TypesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { types } = this.props
        return(
            <EntityTable
                schema={schema}
                items={types}
                hidden={{session_id: true}}
                formTitle="EDITAR TIPO"
                Form={TypeForm}
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            types: store.types.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(TypesTable)
import React from 'react'

import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class CompaniesTable extends React.Component {
    componentWillMount() {
        this.props.fetch('?session=' + this.props.sessionId)
    }

    render() {
        const { codes } = this.props
        return(
            <EntityTable 
                scrollable
                schema={schema} 
                items={codes} 
                full 
            />
        )
    }
}

export default connect(
    ( store ) => {
        return {
            codes: store.codes.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(CompaniesTable)
import React from 'react'

import { crud } from '../../../redux/actions/companies'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class CompaniesTable extends React.Component {
    componentWillMount() {
        if( this.props.companies.size === 0 ) {
            this.props.fetch()
        }
    }

    render() {
        const { companies } = this.props
        return(
            <EntityTable schema={schema} items={companies} full />
        )
    }
}

export default connect(
    ( store ) => {
        return {
            companies: store.companies.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(CompaniesTable)
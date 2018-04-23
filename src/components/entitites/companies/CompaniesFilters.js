import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/companies'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'

class CompaniesFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.companiesFiltersComponent = EntityFilters( schema, props.fetch )
    }

    render() {
        const CompaniesFiltersComponent = this.companiesFiltersComponent

        return(
            <div>
                <CompaniesFiltersComponent
                    title="BUSCAR COMPAÑÍA"
                    fetchBaseQuery={''}
                    hidden={{logo_url: true}}
                    selectors={{}}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(CompaniesFilters)
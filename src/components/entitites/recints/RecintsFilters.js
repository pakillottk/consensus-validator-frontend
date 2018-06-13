import React from 'react'

import { crud } from '../../../redux/actions/recints'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'

class RecintsFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.recintFiltersComponent = EntityFilters( schema, props.fetch )
    }

    render() {
        const RecintFiltersComponent = this.recintFiltersComponent
        return(
            <div>
                <RecintFiltersComponent
                    title="BUSCAR RECINTOS"
                    hidden={{recint_plane:true}}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(RecintsFilters)
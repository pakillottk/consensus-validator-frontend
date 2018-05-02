import React from 'react'

import { crud } from '../../../redux/actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'

class UserFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.userFilterComponent = EntityFilters( schema, props.fetch )
    }

    render() {
        const UserFilterComponent = this.userFilterComponent
        return(
            <div>
                <UserFilterComponent
                    title="BUSCAR USUARIO"
                    fetchBaseQuery={''}
                    hidden={{role: true, company: true, password: true}}
                    selectors={{
                        role_id: true,
                        company_id: true
                    }}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(UserFilters)
import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/sales'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EntityFilters from '../EntityFilters'
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import SessionSelector from '../../forms/Controls/SessionSelector/SessionSelector'
import moment from 'moment'

const filterSchema = [
    {
        name: 'user_id',
        label: 'VENDIDO POR',
        type:'custom',
        component: UserSelector
    },
    {
        name: 'from_sale_date',
        label: 'DESDE',
        type:'input',
        component:'datetime-local'
    },
    {
        name: 'to_sale_date',
        label: 'HASTA',
        defaultValue: new Date(),
        type:'input',
        component:'datetime-local',
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    }
]

const sessionField =  {
    name: 'session',
    label: 'SESIÓN',
    type: 'custom',
    component: SessionSelector
}

class SaleFilters extends React.Component {
    constructor( props ) {
        super( props )

        if( props.showSessionSelector ) {
            this.filterComponent = EntityFilters( [...filterSchema, sessionField], props.fetch )
        } else {
            this.filterComponent = EntityFilters( filterSchema, props.fetch )
        }
    }

    render() {
        const { sessionId } = this.props
        const SaleFiltersComponent = this.filterComponent

        return(
            <div>
                <SaleFiltersComponent
                    title="FILTRAR"
                    fetchBaseQuery={sessionId ? 'session=' + sessionId : ''}
                    hidden={{}}
                    selectors={{
                        user_id: true
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
})(SaleFilters)
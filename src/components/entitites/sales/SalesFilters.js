import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/sales'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EntityFilters from '../EntityFilters'
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import SessionSelector from '../../forms/Controls/SessionSelector/SessionSelector'
import moment from 'moment'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker'

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
        type:'custom',
        component: DatePicker,
        inputFormat: ( date ) => {
            return moment( date )
        }
    },
    {
        name: 'to_sale_date',
        label: 'HASTA',
        defaultValue: new Date(),
        type:'custom',
        component: DatePicker,
        inputFormat: ( date ) => {
            return moment( date )
        }
    }
]

const sessionField =  {
    name: 'session',
    label: 'SESIÓN',
    defaultValue: 0,
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
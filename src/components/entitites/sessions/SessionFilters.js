import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'
import moment from 'moment'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker'

const modifiedSchema = [
    ...schema,
    {
        name: 'from_date',
        label: 'DESDE',
        type:'custom',
        component: DatePicker,
        inputFormat: ( date ) => {
            return moment( date )
        }
    },
    {
        name: 'to_date',
        label: 'HASTA',
        defaultValue: new Date(),
        type:'custom',
        component: DatePicker,
        inputFormat: ( date ) => {
            return moment( date )
        }
    }
]

class SessionFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.sessionFilterComponent = EntityFilters( modifiedSchema, props.fetch )
    }

    render() {
        const SessionFilterComponent = this.sessionFilterComponent
        return(
            <div>
                <SessionFilterComponent
                    title="BUSCAR SESIÓN"
                    fetchBaseQuery={''}
                    hidden={{date: true, sellers_locked_at: true, ticketoffice_closed_at: true}}
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
})(SessionFilters)
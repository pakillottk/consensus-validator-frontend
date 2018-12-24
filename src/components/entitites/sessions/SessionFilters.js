import React from 'react'

import { crud } from '../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'
import moment from 'moment'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker'

const now = new Date()
//const initialFrom = new Date(now.getFullYear(), 0, 1, 0, 0)
const initialFrom = now;
const initialTo = (new Date()).setFullYear(now.getFullYear()+1);//new Date(now.getFullYear(), 11, 31, 23, 59)
const modifiedSchema = [
    ...schema,
    {
        name: 'from_date',
        label: 'DESDE',
        type:'custom',
        defaultValue: initialFrom,
        component: DatePicker,
        inputFormat: ( date ) => {
            return moment( date )
        }
    },
    {
        name: 'to_date',
        label: 'HASTA',
        defaultValue: initialTo,
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
                    initialQuery={"from_date="+moment(initialFrom).toISOString()+"&to_date="+moment(initialTo).toISOString()}
                    fetchBaseQuery={''}
                    hidden={{ticketing_flow: true, location:true, recint:true, header_img: true, logos_img: true, date: true, sellers_locked_at: true, ticketoffice_closed_at: true}}
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
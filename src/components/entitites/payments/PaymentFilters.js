import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/payments'
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

class PaymentFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.paymentFilterComponent = EntityFilters( modifiedSchema, props.fetch )
    }

    render() {
        const { sessionId } = this.props
        const PaymentFilterComponent = this.paymentFilterComponent
        return(
            <div>
                <PaymentFilterComponent
                    title="BUSCAR PAGO"
                    fetchBaseQuery={sessionId ? 'session='+sessionId : ''}
                    hidden={{created_at: true, username: true, ammount: true}}
                    selectors={{pay_form: true}}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(PaymentFilters)
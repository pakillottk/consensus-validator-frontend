import React from 'react'

import Segment from '../../ui/segment/Segment'
import { crud } from '../../../redux/actions/payments'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import PaymentForm from './PaymentForm'
import Currency from 'react-currency-formatter'

class PaymentsTable extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.sessionId ? '?session='+this.props.sessionId : '' )
    }

    calculateTotals( items ) {
        let totalPaid = 0
        items.forEach( payment => {
            totalPaid += parseFloat( payment.ammount )
        })

        return {
            username: 'TOTAL',
            ammount:<Currency currency='EUR' quantity={totalPaid}/>
        }
    }

    render() {
        const { payments } = this.props
        return(
            <div>
                <Segment secondary>
                    <h3 style={{textAlign:'center'}}> TOTAL PAGOS: {payments.size} </h3>
                </Segment>
                <EntityTable 
                    schema={schema}
                    hidden={{user_id: true}} 
                    items={payments} 
                    formTitle="EDITAR PAGO"
                    Form={PaymentForm}
                    calculateTotals={this.calculateTotals.bind(this)}
                    full 
                />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            payments: store.payments.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(PaymentsTable)
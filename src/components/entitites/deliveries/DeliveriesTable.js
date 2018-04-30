import React from 'react'

import { crud } from '../../../redux/actions/deliveries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import DeliverForm from './DeliverForm'

class DeliveriesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    calculateTotals( items ) {
        let totalAmmount = 0
        items.forEach( delivery => {
            totalAmmount += delivery.ammount
        })

        return {
            username: 'TOTAL',
            ammount: totalAmmount
        }
    }

    render() {
        const { deliveries } = this.props
        return(
            <EntityTable
                schema={schema}
                items={deliveries}
                formTitle="EDITAR ENTREGA"
                Form={DeliverForm}
                hidden={{type_id: true, user_id: true}}
                calculateTotals={this.calculateTotals.bind(this)}
                scrollable
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            deliveries: store.deliveries.data
                        .sort( (a,b) => {
                            if( a.created_at < b.created_at ) { return 1; }
                            if( a.created_at > b.created_at ) { return -1; }
                            if( a.created_at === b.created_at ) { return 0; }
                        })
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(DeliveriesTable)
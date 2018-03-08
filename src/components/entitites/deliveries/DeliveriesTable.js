import React from 'react'

import { crud } from '../../../redux/actions/deliveries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import DeliverForm from './DeliverForm'

class DeliveriesTable extends React.Component {
    componentWillMount() {
        this.props.fetch()
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
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            deliveries: store.deliveries.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(DeliveriesTable)
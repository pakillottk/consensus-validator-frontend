import React from 'react'

import { crud } from '../../../redux/actions/seatprices'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import SeatPriceForm from './SeatPriceForm'
import NewSeatPriceButton from './NewSeatPriceButton'

class SeatPricesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { seatprices, sessionId } = this.props
        return(
            <div>
                <NewSeatPriceButton sessionId={sessionId} />
                <EntityTable
                    schema={schema}
                    items={seatprices}
                    hidden={{session_id: true}}
                    formTitle="EDITAR ASIGNACIÓN PRECIOS"
                    Form={SeatPriceForm}
                    full
                />
            </div>
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            seatprices: store.seatprices.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(SeatPricesTable)
import React from 'react'

import { crud } from '../../../redux/actions/seatreserves'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import SeatReserveForm from './SeatReserveForm'

class SeatReservesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { seatreserves, onlyInfinites } = this.props
        return(
            <div>
                <EntityTable
                    schema={schema}
                    items={onlyInfinites ? seatreserves.filter( reserve => reserve.user_id === null && reserve.expires_at === null) : seatreserves}
                    hidden={{user_id: true, session_id: true, zone_id: true, type_id: true}}
                    formTitle="EDITAR RESERVA"
                    Form={SeatReserveForm}
                    scrollable
                    full
                />
            </div>
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            seatreserves: store.seatreserves.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(SeatReservesTable)
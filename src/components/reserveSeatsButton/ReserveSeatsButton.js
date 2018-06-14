import React from 'react'

import { crud } from '../../redux/actions/seatreserves'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Button from '../ui/button/Button'

class ReserveSeatsButton extends React.Component {
    reserveSeats() {
        const { createReserve, sessionId, seatData, reservedBy, expiresAt } = this.props
        const onDone = this.props.onDone || ( () => {} )
        if( !sessionId ) {
            return
        }

        seatData.forEach( seat => {
            const reserve = {
                session_id: sessionId,
                zone_id: seat.zoneId,
                seat_row: seat.row,
                seat_index: seat.seatIndex
            }
            if( reservedBy ) {
                reserve.user_id = reservedBy
            }
            if( expiresAt ) {
                reserve.expires_at = expiresAt
            }
            createReserve( reserve )
        })

        onDone()
    }

    render() {
        return(
            <Button disabled={this.props.seatData.length === 0} context="possitive" onClick={()=>this.reserveSeats()}>RESERVAR ASIENTOS</Button>
        )
    }
}
export default connect(
    () => { return {} },
    ( dispatch ) => {
        return {
            createReserve: bindActionCreators( crud.create, dispatch )
        }
    }
)(ReserveSeatsButton)
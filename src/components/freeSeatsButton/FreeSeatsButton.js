import React from 'react'

import { crud } from '../../redux/actions/seatreserves'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Button from '../ui/button/Button'

class FreeSeatsButton extends React.Component {
    freeSeats() {
        const { removeReserve, seatData, seatreserves } = this.props
        const onDone = this.props.onDone || ( () => {} )
        seatData.forEach( seat => {
            const toDelete = seatreserves.filter( reserve => {
                return seat.zoneId === reserve.zone_id &&
                       seat.row === reserve.seat_row &&
                       seat.seatIndex === reserve.seat_index
            })
            toDelete.forEach( reserveToDelete => {
                removeReserve( reserveToDelete.id ) 
            })
        });
        
        onDone()
    }

    render() {
        return(
            <Button disabled={this.props.seatData.length === 0} context="negative" onClick={()=>this.freeSeats()}>LIBERAR ASIENTOS</Button>
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
            removeReserve: bindActionCreators( crud.delete, dispatch )
        }
    }
)(FreeSeatsButton)
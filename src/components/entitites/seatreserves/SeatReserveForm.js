import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/seatreserves'

const Form = EntityForm( 'seatreserves', crud, Schema, 'RESERVAS' );
export default class SeatReserveForm extends React.Component {
    render() {
        const { id, defaultvalues, dataTransformer } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} dataTransformer={dataTransformer} id={id} hidden={{user:true,zone:true,seat_index: true, seat_row: true,session_id: true}}/>
            </div>
        );
    }
}
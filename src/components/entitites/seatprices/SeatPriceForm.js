import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/seatprices'
import RemoveSeatPriceButton from './RemoveSeatPriceButton'

const Form = EntityForm( 'seatprices', crud, Schema, 'ASIGNAR PRECIOS' );
export default class SeatPriceForm extends React.Component {
    render() {
        const { id, defaultvalues, dataTransformer } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} dataTransformer={dataTransformer} id={id} hidden={{zone:true,type:true,session_id: true}}/>
                { this.props.id && <RemoveSeatPriceButton id={this.props.id} /> }
            </div>
        );
    }
}
import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/deliveries'
import RemoveDeliverButton from './RemoveDeliverButton'

const Form = EntityForm( 'deliveries', crud, Schema, 'ENTREGA' )
export default class DeliverForm extends React.Component {
    render() {        
        return( 
            <div>
                <Form id={this.props.id} hidden={{username: true, typeText: true, created_at: true}}/>
                { this.props.id && <RemoveDeliverButton id={this.props.id} />}
            </div>
        )
    }
}
import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/types'
import RemoveTypeButton from './RemoveTypeButton'

const Form = EntityForm( 'types', crud, Schema, 'TIPO' );
export default class TypeForm extends React.Component {
    render() {
        const { id, defaultvalues } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} id={id} />
                { this.props.id && <RemoveTypeButton id={this.props.id} /> }
            </div>
        );
    }
}
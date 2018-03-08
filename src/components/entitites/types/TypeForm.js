import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'
import TypeValidator from '../../forms/Validators/TypeValidator'

import { crud } from '../../../redux/actions/types'
import RemoveTypeButton from './RemoveTypeButton'

const Form = EntityForm( 'types', crud, Schema, 'TIPO', TypeValidator );
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
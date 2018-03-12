import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'
import ScanTypeValidator from '../../forms/Validators/ScanTypeValidator'

import { crud } from '../../../redux/actions/scantypes'
import RemoveScanTypeButton from './RemoveScanTypeButton'

const Form = EntityForm( 'scantypes', crud, Schema, 'GRUPOS DE ESCANEO', ScanTypeValidator );
export default class ScanTypeForm extends React.Component {
    render() {
        const { id, defaultvalues } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} id={id} hidden={{type: true, group_id: true, group: true}} />
                { this.props.id && <RemoveScanTypeButton id={this.props.id} /> }
            </div>
        );
    }
}
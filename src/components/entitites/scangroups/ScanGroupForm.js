import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/scangroups'
import RemoveScanGroupButton from './RemoveScanGroupButton'

const Form = EntityForm( 'scangroups', crud, Schema, 'GRUPOS DE ESCANEO' );
export default class ScanGroupForm extends React.Component {
    render() {
        const { id, defaultvalues } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} id={id} hidden={{session_id: true}}/>
                { this.props.id && <RemoveScanGroupButton id={this.props.id} /> }
            </div>
        );
    }
}
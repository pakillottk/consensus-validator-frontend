import React from 'react'

import Schema from './Schema'
import EntityForm from '../EntityForm'
import RemoveUserScanGroupButton from './RemoveUserScanGroupButton'

import { crud } from '../../../redux/actions/userscangroups'

const Form = EntityForm( 'userscangroups', crud, Schema, 'GRUPOS DE ESCANEO' );
export default class ScanTypeForm extends React.Component {
    render() {
        const { id, defaultvalues } = this.props
        return(
            <div>
                <Form defaultvalues={defaultvalues} id={id} hidden={{username: true, groupname: true}} />
                { this.props.id && <RemoveUserScanGroupButton id={this.props.id} />}
            </div>
        );
    }
}
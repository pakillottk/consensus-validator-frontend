import React from 'react'

import NewEntityButton from '../NewEntityButton'
import ScanTypeForm from './ScanTypeForm'

export default class NewTypeButton extends React.Component {
    render() {
        const { groupId, disabled } = this.props
        return(
            <NewEntityButton disabled={disabled} defaultvalues={{group_id: groupId}} title="NUEVO TIPO ESCANEABLE" Form={ScanTypeForm} full styles={{margin: 0}}/>
        )
    }
}
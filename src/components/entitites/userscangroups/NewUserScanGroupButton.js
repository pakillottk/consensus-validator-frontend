import React from 'react'

import NewEntityButton from '../NewEntityButton'
import UserScanGroupForm from './UserScanGroupForm'

export default class NewTypeButton extends React.Component {
    render() {
        const { disabled } = this.props
        return(
            <NewEntityButton disabled={disabled} title="ASIGNAR GRUPO ESCANEO" Form={UserScanGroupForm} full styles={{margin: 0}}/>
        )
    }
}
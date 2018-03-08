import React from 'react'

import NewEntityButton from '../NewEntityButton'
import ScanGroupForm from './ScanGroupForm'

export default class NewTypeButton extends React.Component {
    render() {
        const { sessionId } = this.props
        return(
            <NewEntityButton defaultvalues={{session_id: sessionId}} title="NUEVO GRUPO" Form={ScanGroupForm} full styles={{margin: 0}}/>
        )
    }
}
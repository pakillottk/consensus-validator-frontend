import React from 'react'

import NewEntityButton from '../NewEntityButton'
import TypeForm from './TypeForm'

export default class NewTypeButton extends React.Component {
    render() {
        const { sessionId } = this.props
        return(
            <NewEntityButton defaultvalues={{session_id: sessionId}} title="NUEVO TIPO" Form={TypeForm} full styles={{margin: 0}}/>
        )
    }
}
import React from 'react'

import NewEntityButton from '../NewEntityButton'
import SessionForm from './SessionForm'

export default class NewSessionButton extends React.Component {
    render() {
        return(
            <NewEntityButton title="NUEVA SESIÓN" Form={SessionForm} full styles={{margin: 0}}/>
        )
    }
}
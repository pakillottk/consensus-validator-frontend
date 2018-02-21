import React from 'react'

import NewEntityButton from '../NewEntityButton'
import UserForm from './UserForm'

export default class NewUserButton extends React.Component {
    render() {
        return(
            <NewEntityButton title="NUEVO USUARIO" Form={UserForm} full styles={{margin: 0}}/>
        )
    }
}
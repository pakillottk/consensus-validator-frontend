import React from 'react'

import NewEntityButton from '../NewEntityButton'
import SessionForm from './SessionForm'
import { Admin } from '../../auth/authLevels'

const AdminButton = Admin(NewEntityButton)
export default class NewSessionButton extends React.Component {
    render() {
        return(
            <AdminButton title="NUEVA SESIÓN" Form={SessionForm} full styles={{margin: 0}}/>
        )
    }
}
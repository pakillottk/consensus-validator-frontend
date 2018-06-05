import React from 'react'

import NewEntityButton from '../NewEntityButton'
import RecintForm from './RecintForm'
import Auth from '../../auth/authorization'

export default class NewRecintButton extends React.Component {
    render() {
        return(
            <NewEntityButton 
                AuthLevel={Auth(['superadmin'])}
                title="NUEVO RECINTO" 
                Form={RecintForm} 
                full 
                styles={{margin: 0}}
            />
        )
    }
}
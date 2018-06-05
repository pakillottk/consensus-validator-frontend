import React from 'react'

import NewEntityButton from '../NewEntityButton'
import RecintZoneForm from './RecintZoneForm'
import Auth from '../../auth/authorization'

export default class NewRecintButton extends React.Component {
    transformer( data, isUpdate ) {
        if( !isUpdate ) {
            data.recint_id = this.props.recintId
        }

        return data;
    }

    render() {
        return(
            <NewEntityButton 
                AuthLevel={Auth(['superadmin'])}
                title="NUEVA ZONA" 
                Form={RecintZoneForm} 
                dataTransformer={this.transformer.bind(this)}
                full 
                styles={{margin: 0}}
            />
        )
    }
}
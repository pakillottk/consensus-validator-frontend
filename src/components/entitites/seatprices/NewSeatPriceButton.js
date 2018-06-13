import React from 'react'

import NewEntityButton from '../NewEntityButton'
import SeatPriceForm from './SeatPriceForm'
import {Supervisor} from '../../auth/authLevels'

export default class NewRecintButton extends React.Component {
    transformer( data, isUpdate ) {
        if( !isUpdate ) {
            data.session_id = this.props.sessionId
        }

        return data;
    }

    render() {
        return(
            <NewEntityButton 
                AuthLevel={Supervisor}
                title="NUEVA ASIGNACIÓN PRECIOS" 
                Form={SeatPriceForm} 
                dataTransformer={this.transformer.bind(this)}
                full 
                styles={{margin: 0}}
            />
        )
    }
}
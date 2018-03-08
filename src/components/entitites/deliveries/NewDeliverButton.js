import React from 'react'

import NewEntityButton from '../NewEntityButton'
import DeliverForm from './DeliverForm'

export default class NewDeliverButton extends React.Component {
    render() {
        return(
            <NewEntityButton title="NUEVA ENTREGA" Form={DeliverForm} full styles={{margin: 0}}/>
        )
    }
}
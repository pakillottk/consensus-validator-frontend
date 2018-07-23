import React from 'react'

import NewEntityButton from '../NewEntityButton'
import SessionSupervisorForm from './SessionSupervisorForm'

export default class NewTypeButton extends React.Component {
    transformer( data, isUpdate ) {
        if( !isUpdate ) {
            data.session_id = this.props.sessionId
        }

        return data;
    }

    render() {
        const { disabled } = this.props
        return(
            <NewEntityButton 
                disabled={disabled}
                title="AUTORIZAR NUEVO SUPERVISOR" 
                Form={SessionSupervisorForm} 
                dataTransformer={this.transformer.bind(this)}
                full 
                styles={{margin: 0}}
            />
        )
    }
}
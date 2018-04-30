import React from 'react'

import NewEntityButton from '../NewEntityButton'
import ComissionsForm from './ComissionsForm'

export default class NewComissionButton extends React.Component {
    attachSessionId( data, mode ) {
        data.session_id = this.props.sessionId;
        return data;
    }

    render() {
        return(
            <NewEntityButton 
                title="NUEVA COMISIÓN"
                dataTransformer={this.attachSessionId.bind(this)} 
                Form={ComissionsForm} 
                full 
                styles={{margin: 0}}
            />
        )
    }
}
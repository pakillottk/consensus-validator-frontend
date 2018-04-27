import React from 'react'

import Button from '../ui/button/Button'

import { create } from '../../redux/actions/windows'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Supervisor } from '../auth/authLevels'

class NewEntityButton extends React.Component {
    constructor( props ) {
        super( props )

        const { AuthLevel } = props
        this.guardedButton = AuthLevel ? AuthLevel(Button, true) : Supervisor(Button, true)
    }

    createWindow() {
        const { title, Form, defaultvalues, dataTransformer } = this.props
        if( !Form ) {
            console.error( 'New entity button has not a Form component assigned' )
            return
        }
        
        this.props.create( title || 'NUEVO', (<div> <Form dataTransformer={dataTransformer} defaultvalues={defaultvalues} /> </div>) )
    }

    render() {
        const { disabled, styles, full, text } = this.props
        const GuardedButton = this.guardedButton
        return(
            <GuardedButton disabled={disabled} context='possitive' styles={styles} full onClick={() => this.createWindow()}>{text || 'NUEVO'}</GuardedButton>
        )
    }
}

export default connect(
    () => { return {} },
    dispatch => {
        return {
            create: bindActionCreators( create, dispatch )
        }
    }
)(NewEntityButton)
import React from 'react'

import Button from '../ui/button/Button'

import { create } from '../../redux/actions/windows'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Supervisor } from '../auth/authLevels'

class NewEntityButton extends React.Component {
    createWindow() {
        const { title, Form, defaultvalues } = this.props
        if( !Form ) {
            console.error( 'New entity button has not a Form component assigned' )
            return
        }
        this.props.create( title || 'NUEVO', (<div> <Form defaultvalues={defaultvalues} /> </div>) )
    }

    render() {
        const { styles, full, text } = this.props
        return(
            <Button context='possitive' styles={styles} full onClick={() => this.createWindow()}>{text || 'NUEVO'}</Button>
        )
    }
}

NewEntityButton = Supervisor( NewEntityButton, true )
export default connect(
    () => { return {} },
    dispatch => {
        return {
            create: bindActionCreators( create, dispatch )
        }
    }
)(NewEntityButton)
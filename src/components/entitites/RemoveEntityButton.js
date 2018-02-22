import React from 'react'

import Button from '../ui/button/Button'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default ( removeAction ) => {
    class RemoveEntityButton extends React.Component {
        removeEntity() {    
            this.props.remove( this.props.id )
        }
    
        render() {
            const { styles, full, text } = this.props
            return(
                <Button context='negative' styles={styles} full onClick={() => this.removeEntity()}>{text || 'ELIMINAR'}</Button>
            )
        }
    }

    return connect(
        () => { return {} },
        ( dispatch ) => {
            return {
                remove: bindActionCreators( removeAction, dispatch )
            }
        }
    )(RemoveEntityButton)
}
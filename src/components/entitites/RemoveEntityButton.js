import React from 'react'

import ConfirmModal from '../confirmModal/ConfirmModal'
import Button from '../ui/button/Button'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default ( removeAction ) => {
    class RemoveEntityButton extends React.Component {
        constructor( props ) {
            super( props )

            this.state = {
                openConfirm: false
            }
        }

        switchConfirmDialog( open ) {
            this.setState({openConfirm: open})
        }

        removeEntity() {    
            this.props.remove( this.props.id )
            this.switchConfirmDialog( false )
        }
    
        render() {
            const { styles, full, text } = this.props
            return(
                <div>
                    <ConfirmModal 
                        open={this.state.openConfirm}
                        title="Confirmar eliminación"
                        message="¿Seguro que desea eliminar? Esta acción no podra deshacerse."
                        onConfirm={() => this.removeEntity()}
                        onCancel={() => this.switchConfirmDialog( false )}
                    />
                    <Button 
                        context='negative' 
                        styles={styles} 
                        full 
                        onClick={() => this.switchConfirmDialog( true )}
                    >
                        {text || 'ELIMINAR'}
                    </Button>
                </div>
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
import React from 'react'
import Modal from '../ui/modal/Modal'

import Button from '../ui/button/Button'
import Divider from '../ui/divider/Divider'

class ConfirmModal extends React.Component {
    render() {
        const { open, title, message, onConfirm, onCancel } = this.props
        return(
            <Modal hideClose open={open} title={title}>
                <div>
                    <h3>{message}</h3>
                    {this.props.children}
                    <Divider />
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <Button context="possitive" onClick={onConfirm}>ACEPTAR</Button>
                        <Button context="negative" onClick={onCancel}>CANCELAR</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ConfirmModal
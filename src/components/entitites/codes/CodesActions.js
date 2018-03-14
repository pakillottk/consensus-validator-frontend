import React from 'react'

import Segment from '../../ui/segment/Segment'
import Button from '../../ui/button/Button'
import ConfirmModal from '../../confirmModal/ConfirmModal'

import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CodesActions extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            openConfirm: false
        }
    }
    enableCodes() {
        const { codes, update } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            if( parseInt(code.maxValidations) === -1 ) {
                update( code.id, { maxValidations: 1 } )
            }
        })
    }

    deleteCodes() {
        const { codes, remove } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            remove( code.id )
        })

        this.switchConfirmDialog( false )
    }

    switchConfirmDialog( open ) {
        this.setState({openConfirm: open})
    }

    render() {   
        const { codes } = this.props  
        if( !codes ) {
            return null
        }

        return(
            <div>
                <Segment secondary style={{padding: 0}}>
                    <div style={{textAlign: 'center'}}>SELECCIONADOS: {Object.keys(codes).length}</div>
                    <Button context="relevant" onClick={() => this.enableCodes()}> ACTIVAR </Button>                    
                    <ConfirmModal 
                        open={this.state.openConfirm}
                        title="Confirmar eliminación"
                        message="¿Seguro que desea eliminar? Esta acción no podra deshacerse."
                        onConfirm={() => this.deleteCodes()}
                        onCancel={() => this.switchConfirmDialog( false )}
                    />
                    <Button 
                        context='negative' 
                        onClick={() => this.switchConfirmDialog( true )}
                    >
                    ELIMINAR
                    </Button>                    
                </Segment>                
            </div>
        )
    }
}
export default connect(() => { return {} }, dispatch => {
    return {
        update: bindActionCreators( crud.update, dispatch ),
        remove: bindActionCreators( crud.delete, dispatch )
    }
})(CodesActions)
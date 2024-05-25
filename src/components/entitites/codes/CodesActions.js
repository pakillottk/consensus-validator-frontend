import React from 'react'

import Segment from '../../ui/segment/Segment'
import Button from '../../ui/button/Button'
import ConfirmModal from '../../confirmModal/ConfirmModal'

import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Admin } from '../../auth/authLevels'

import SplitUploader from '../../../utils/SplitUploader'
import { CSVLink } from 'react-csv'

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
            if( parseInt(code.maxValidations, 10) === -1 ) {
                update( code.id, { maxValidations: 1 } )
            }
        })

        this.deselectCodes()
    }

    enableCodesLimitless() {
        const { codes, update } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            if( parseInt(code.maxValidations, 10) !== 0 ) {
                update( code.id, { maxValidations: 0 } )
            }
        })

        this.deselectCodes()
    }

    resetCodes() {
        const { codes, update } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            if( parseInt(code.validations, 10) !== 0 ) {
                update( code.id, { validations: 0, out: true } )
            }
        })

        this.deselectCodes()
    }

    switchCodesOut() {
        const { codes, update } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            update( code.id, { out: !code.out } )            
        })

        this.deselectCodes()
    }

    disableCodes() {
        const { codes, update } = this.props
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            if( parseInt(code.maxValidations, 10) !== -1 ) {
                update( code.id, { maxValidations: -1 } )            
            }
        })

        this.deselectCodes()
    }

    deleteCodes() {
        const { codes, remove, bulkDelete } = this.props
        let toDelete = []
        Object.keys(codes).forEach( codeId => {
            const code = codes[ codeId ]
            toDelete.push( code.id )
        })

        if( toDelete.length === 1 ) {
            remove( toDelete[0] )
        } else {
            SplitUploader( toDelete, ( upload, remaining ) => {
                bulkDelete( upload )
            })
        }

        this.switchConfirmDialog( false )
        this.deselectCodes()
    }

    switchConfirmDialog( open ) {
        this.setState({openConfirm: open})
    }

    deselectCodes() {
        const { onDeselect } = this.props
        if( onDeselect ) {
            onDeselect()
        }
    }

    codesAsArray( codes, removeId=false ) {
        const array = [] 
        for( let codeId in codes ) {
            let code = {...codes[ codeId ]}
            if( removeId ) {
                delete code.id
            }
            array.push( code )
        }
        return array
    }

    render() {   
        const { codes } = this.props
        const codesCount = Object.keys( codes ).length  
        if( !codes ) {
            return null
        }

        return(
            <div className={codesCount === 0 ? "disabled": ""}>
                <Segment secondary style={{padding: 0}}>
                    <div style={{textAlign: 'center'}}>SELECCIONADOS: {Object.keys(codes).length}</div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button disabled={codesCount === 0} context="relevant" onClick={() => this.enableCodes()}> ACTIVAR </Button>                    
                        <Button disabled={codesCount === 0} context="possitive" onClick={() => this.enableCodesLimitless()}> ACTIVAR (SIN LÍMITE) </Button>                    
                        <Button disabled={codesCount === 0} context="dark" onClick={() => this.resetCodes()}> REINICIAR </Button>  
                        <Button disabled={codesCount === 0} context="dark" onClick={() => this.switchCodesOut()}> CAMBIAR FUERA/DENTRO </Button>                    
                        <Button disabled={codesCount === 0} context="negative" onClick={() => this.disableCodes()}> DESACTIVAR </Button>
                        <CSVLink 
                            data={this.codesAsArray( codes, true )}
                            style={{
                                background:'#666', 
                                textAlign:'center', 
                                color:'white', 
                                textDecoration:'none',
                                padding:'10px'
                            }}
                        > 
                            EXPORTAR CSV 
                        </CSVLink>
                        <ConfirmModal 
                            open={this.state.openConfirm}
                            title="Confirmar eliminación"
                            message="¿Seguro que desea eliminar? Esta acción no podra deshacerse."
                            onConfirm={() => this.deleteCodes()}
                            onCancel={() => this.switchConfirmDialog( false )}
                        />
                        <Button 
                            disabled={codesCount === 0}
                            context='negative' 
                            onClick={() => this.switchConfirmDialog( true )}
                        >
                            ELIMINAR
                        </Button>             
                    </div>       
                </Segment>                
            </div>
        )
    }
}
export default connect(() => { return {} }, dispatch => {
    return {
        update: bindActionCreators( crud.update, dispatch ),
        remove: bindActionCreators( crud.delete, dispatch ),
        bulkDelete: bindActionCreators( crud.bulkDelete, dispatch )
    }
})(Admin(CodesActions, true))
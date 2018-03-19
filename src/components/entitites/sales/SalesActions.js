import React from 'react'

import Segment from '../../ui/segment/Segment'
import Button from '../../ui/button/Button'
import ConfirmModal from '../../confirmModal/ConfirmModal'

import { crud, print } from '../../../redux/actions/sales'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Admin } from '../../auth/authLevels'

const AdminButton = Admin(Button)

class SalesActions extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            openConfirm: false
        }
    }
    
    switchConfirmDialog( open ) {
        this.setState({openConfirm: open})
    }

    deselectSales() {
        const { onDeselect } = this.props
        if( onDeselect ) {
            onDeselect()
        }
    }

    printSales() {
        const { sales, print } = this.props
        const toPrint = []
        Object.keys( sales ).forEach( saleId => {
            toPrint.push( sales[ saleId ] )
        })
        print( toPrint )

        this.deselectSales()
    }

    deleteSales() {
        const { sales, remove } = this.props
        Object.keys( sales ).forEach( saleId => {
            remove( saleId )
        })

        this.switchConfirmDialog( false )
    }

    render() {   
        const { sales } = this.props
        const salesCount = Object.keys( sales ).length  
        if( !sales ) {
            return null
        }

        return(
            <div className={salesCount === 0 ? "disabled": ""}>
                <Segment secondary style={{padding: 0}}>
                    <div style={{textAlign: 'center'}}>SELECCIONADOS: {Object.keys(sales).length}</div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button disabled={salesCount === 0} context="relevant" onClick={() => this.printSales()}> IMPRIMIR </Button>                                
                        <ConfirmModal 
                            open={this.state.openConfirm}
                            title="Confirmar eliminación"
                            message="¿Seguro que desea eliminar? Esta acción no podra deshacerse."
                            onConfirm={() => this.deleteSales()}
                            onCancel={() => this.switchConfirmDialog( false )}
                        />
                        <AdminButton 
                            disabled={salesCount === 0}
                            context='negative' 
                            onClick={() => this.switchConfirmDialog( true )}
                        >
                            ELIMINAR
                        </AdminButton> 
                    </div>                         
                </Segment>                
            </div>
        )
    }
}
export default connect(() => { return {} }, dispatch => {
    return {
        print: bindActionCreators( print, dispatch ),
        remove: bindActionCreators( crud.delete, dispatch )
    }
})(SalesActions)
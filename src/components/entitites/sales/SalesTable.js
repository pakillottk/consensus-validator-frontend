import React from 'react'
import Segment from '../../ui/segment/Segment'
import Table from '../../ui/table/Table'
import { connect } from 'react-redux'
import SalesActions from './SalesActions'

import ApplyComission from '../../../entities/comissions/ApplyComission'

import Currency from 'react-currency-formatter'
import moment from 'moment'
const fields = [
    {label: 'F.VENTA', name: 'created_at', displayFormat: ( date ) => moment( date ).format( 'DD/MM/YYYY HH:mm' ) },
    {label:'VENDIDO POR', name:'username'},
    {label: 'TIPO', name:'type' },
    {label: 'PRECIO', name:'price'},
    {label:'CÓDIGO', name:'codeStr'},
    {label:'ZONA', name:'zone'},
    {label:'FILA', name:'seat_row'},
    {label:'ASIENTO', name:'seat_number'},
    {label:'NOMBRE', name:'name'},
    {label:'EMAIL', name: 'email'},
]

class SalesTable extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            selected: {}
        }
    }
    
    onSelection( sales ) {
        this.setState({selected: sales})
    }

    render() {
        const { selected } = this.state
        const { sales, hideActions, enableRefunds } = this.props
        return(
            <div>
                {!hideActions && <SalesActions enableRefunds={enableRefunds} sales={selected} onDeselect={() => this.onSelection({})}/>}
                <Segment secondary>
                    <h3 style={{textAlign:'center'}}> TOTAL VENTAS: {sales.length} </h3>
                </Segment>
                <Table
                    scrollable
                    multiselect={!hideActions}
                    fields={fields}
                    items={sales}
                    onSelection={this.onSelection.bind(this)}
                    selected={selected}
                    full
                />
            </div>
        )
    }
}
export default connect( (store, props) => {
    const salesMap = store.sales.data
    const comissionsMap = store.comissions.data
    const comissionByUser = {}
    comissionsMap.forEach( comission => {
        let sessionComission = {}
        if( !comissionByUser[ comission.user_id ] ) {
            sessionComission[ comission.session_id ] = comission
            comissionByUser[ comission.user_id ] = sessionComission
        } else {
            sessionComission = comissionByUser[ comission.user_id ]
            sessionComission[ comission.session_id ] = comission
            comissionByUser[ comission.user_id ] = sessionComission
        }
    })
    
    let sales = []
    salesMap.forEach( sale => {
        const type = store.types.data.get( parseInt( sale.type_id, 10 ) )
        if( !type ) {
            return
        }
        let comission = null 
        if( comissionByUser[ sale.user_id ] ) {
            comission = comissionByUser[ sale.user_id ][ type.session_id ]
        }
        sales.push({
            ...sale, 
            codeStr: sale.code.code, 
            type: type.type, 
            price: (
                <Currency 
                    currency='EUR' 
                    quantity={ApplyComission( type, comission )} 
                />), 
            name: sale.code.name, 
            email: sale.code.email 
        })
    })
    sales = sales.filter( sale => props.showRefunds ? sale.refund : !sale.refund ).sort( (sale, otherSale) =>  {
        const saleDate = moment( sale.created_at );
        const otherDate = moment( otherSale.created_at );
        if( saleDate.isBefore( otherDate ) ) { return 1; }
        if( saleDate.isAfter( otherDate ) ) { return -1; }
        
        return 0;
    })
    
    return {
        sales
    }
})(SalesTable)
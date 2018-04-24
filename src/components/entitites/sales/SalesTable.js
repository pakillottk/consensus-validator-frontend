import React from 'react'
import Segment from '../../ui/segment/Segment'
import Table from '../../ui/table/Table'
import { connect } from 'react-redux'
import SalesActions from './SalesActions'

import moment from 'moment'
const fields = [
    {label: 'F.VENTA', name: 'created_at', displayFormat: ( date ) => moment( date ).format( 'DD/MM/YYYY HH:mm' ) },
    {label:'VENDIDO POR', name:'username'},
    {label: 'TIPO', name:'type' },
    {label: 'PRECIO', name:'price'},
    {label:'CÓDIGO', name:'codeStr'},
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
        const { sales, hideActions } = this.props
        return(
            <div>
                {!hideActions && <SalesActions sales={selected} onDeselect={() => this.onSelection({})}/>}
                <Segment secondary>
                    <h3 style={{textAlign:'center'}}> TOTAL VENTAS: {sales.length} </h3>
                </Segment>
                <Table
                    scrollable
                    multiselect
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
export default connect( store => {
    const salesMap = store.sales.data
    let sales = []
    salesMap.forEach( sale => {
        const type = store.types.data.get( parseInt( sale.type_id ) )
        if( !type ) {
            return
        }
        sales.push({...sale, codeStr: sale.code.code, type: type.type, price: type.price+'€', name: sale.code.name, email: sale.code.email })
    })
    sales = sales.sort( (sale, otherSale) =>  {
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
import React from 'react'

import Table from '../ui/table/Table'
import Segment from '../ui/segment/Segment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud } from '../../redux/actions/sales'

import Currency from 'react-currency-formatter'

const tableFields = [
    {
        name: 'type',
        label: 'TIPO',
        type:'input'
    },
    {
        name: 'sold',
        label: 'VENDIDAS',
        type:'input'
    },
    {
        name: 'revenue',
        label: 'COBRADO',
        type:'input'
    }
]

class SalesSummary extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.sessionId ? '?session=' + this.props.sessionId : '' )
    }

    getSummaryData( sales ) {
        const output = []
        const totals = {
            type: 'TOTAL',
            sold: 0,
            revenue: 0,
        }
        const data = {}
        
        sales.forEach( sale => {
            if( !data[ sale.type_id ] ) {
                data[ sale.type_id ] = {
                    type: sale.code.type.type + ' ' + sale.code.type.price + '€',
                    sold: 1,
                    revenue: sale.code.type.price
                }
            } else {
                data[ sale.type_id ].sold++
                data[ sale.type_id ].revenue += sale.code.type.price
            }
        })

        Object.keys( data ).forEach( summaryDataKey => {
            const summaryData = data[ summaryDataKey ]
            
            totals.sold += summaryData.sold
            totals.revenue += summaryData.revenue
            
            summaryData.revenue = <Currency quantity={summaryData.revenue} currency='EUR' />
            output.push( summaryData )
        })

        return { summary: output, totals: totals }
    }

    render() {
        const summaryData = this.getSummaryData( this.props.sales )
        return(
            <div>
                <Table
                    full
                    scrollable
                    items={summaryData.summary}
                    fields={tableFields}
                />
                <Segment>
                    <h3 style={{textAlign:'center'}}>
                        RECAUDADO: <Currency quantity={ summaryData.totals.revenue } currency='EUR' />
                    </h3>
                    <h3 style={{textAlign:'center'}}>
                        TOTAL VENDIDAS: {summaryData.totals.sold} 
                    </h3>
                </Segment>
            </div>
        )
    }
}

export default connect( 
    ( store, props ) => {
        return {
            sales: store.sales.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( SalesSummary );
import React from 'react'

import Table from '../ui/table/Table'
import Segment from '../ui/segment/Segment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import moment from 'moment'
import Currency from 'react-currency-formatter'
import ApplyComission from '../../entities/comissions/ApplyComission'
import CalculateSellerComission from '../../entities/comissions/CalculateSellerComission'

const tableFields = [
    {
        name:'session',
        label:'SESIÓN',
        type:'input',
        displayFormat: ( session ) => {
            return(
                <div>
                    <p>
                        <b>{session.name}</b>                    
                    </p>
                    <p style={{fontSize: '0.8rem'}}> {moment( session.date ).format( 'dddd DD MMMM YYYY HH:mm' )}H</p>
                    <p style={{fontSize: '0.7rem'}}> {session.location}</p>  
                </div>
            )
        }
    },
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
        label: 'RECAUDADO',
        type:'input',
        displayFormat: ( revenue ) => {
            return <Currency currency='EUR' quantity={revenue} />
        }
    },
    {
        name: 'comission',
        label: 'COMISIONES',
        type:'input',
        displayFormat: ( comission ) => {
            return <Currency currency='EUR' quantity={comission} />
        }
    },
    {
        name: 'proffit',
        label: 'NETO',
        type:'input',
        displayFormat: ( proffit ) => {
            return <Currency currency='EUR' quantity={proffit} />
        }
    },
    {
        name:'paid',
        label: 'PAGADO',
        type: 'input'
    }, 
    {
        name:'toPay',
        label:'POR PAGAR',
        type:'input'
    }
]

class SalesSummary extends React.Component {
    getSummaryData( sales ) {
        const output = []
        const totals = {
            session: 'TOTAL',
            sold: 0,
            revenue: 0,
            comission: 0,
            proffit: 0,
            toPay: 0
        }
        const data = {}
        
        sales.forEach( sale => {
            const type = this.props.types.get( parseInt( sale.type_id ) )
            const session = type ? this.props.sessions.get( parseInt( type.session_id ) ) : null
            let comission = null 
            if( type && this.props.comissionByUser[ sale.user_id ] ) {
                comission = this.props.comissionByUser[ sale.user_id ][ type.session_id ]
            }
            const realPrice = ApplyComission( type, comission )
            const sellerComission = CalculateSellerComission( type, comission )
            if( !data[ sale.type_id ] ) {
                data[ sale.type_id ] = {
                    session: session,
                    type: sale.code.type.type + ' ' + sale.code.type.price + '€',
                    sold: 1,
                    revenue: realPrice,
                    comission: sellerComission,
                    proffit: ( realPrice - sellerComission ),
                    paid: '-',
                    toPay: '-'
                }
            } else {
                data[ sale.type_id ].sold++
                data[ sale.type_id ].revenue += realPrice
                data[ sale.type_id ].comission += sellerComission
                data[ sale.type_id ].proffit += ( realPrice - sellerComission )
            }
        })

        Object.keys( data ).forEach( summaryDataKey => {
            const summaryData = data[ summaryDataKey ]
            
            totals.sold += summaryData.sold
            totals.revenue += summaryData.revenue
            totals.comission += summaryData.comission

            output.push( summaryData )
        })

        totals.toPay     = <Currency quantity={( totals.revenue - totals.comission - this.props.totalPaid )} currency='EUR' />
        totals.proffit   = <Currency quantity={( totals.revenue - totals.comission )} currency='EUR' />
        totals.revenue   = <Currency quantity={totals.revenue} currency='EUR' />
        totals.paid      = <Currency quantity={this.props.totalPaid} currency='EUR' />
        totals.comission = <Currency quantity={totals.comission} currency='EUR' />

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
                    calculateTotals={( items ) => {
                        return summaryData.totals
                    }}
                />
            </div>
        )
    }
}

export default connect( 
    ( store, props ) => {    
        const types = store.types.data
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

        let totalPaid = 0
        store.payments.data.forEach( payment => {
            totalPaid += payment.ammount
        })

        return {
            sessions: store.sessions.data,
            sales: store.sales.data,
            types: store.types.data,
            comissionByUser,
            totalPaid
        }
    }
)( SalesSummary );
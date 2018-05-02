import React from 'react'

import Segment from '../components/ui/segment/Segment'

import SalesFilters from '../components/entitites/sales/SalesFilters'
import SalesSummary from '../components/salesSummary/SalesSummary'
import SaleCharts from '../components/entitites/sales/SaleCharts'

import { crud as sessionActions } from '../redux/actions/sessions'
import { crud as typesActions } from '../redux/actions/types'
import { crud as salesActions } from '../redux/actions/sales'
import { crud as comissionActions } from '../redux/actions/comissions'
import { crud as paymentActions } from '../redux/actions/payments'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SummaryPage extends React.Component {
    componentWillMount() {
        this.fetchAll()
        this.props.fetchSales()
    }

    formatQuery( queryParams ) {
        return '?' + queryParams.join('&')
    }

    filterQueryParams( queryParams, validFields ) {
        return [...queryParams].filter( param => {
            const field = param.split( '=' )[0]
            return validFields.includes( field )
        })
    }

    fetchAll() {
        this.props.fetchSession()
        this.props.fetchTypes()
        this.props.fetchComissions()
        this.props.fetchPayments()
    }

    handleFilters( base, queryParams ) {
        if( queryParams.length === 0 ) {
            this.fetchAll()
        }

        const paymentsQuery = this.formatQuery( queryParams )
        this.props.fetchPayments( paymentsQuery )

        const typesQuery = this.formatQuery(
            this.filterQueryParams( queryParams, ['session_id'] )
        )
        this.props.fetchTypes( typesQuery )

        const comissionQuery = this.formatQuery( 
            this.filterQueryParams( queryParams, ['session_id', 'user_id'])
        )
        this.props.fetchComissions( comissionQuery )
    }

    render() {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">RESUMEN DE VENTAS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <SalesFilters onQuerySent={this.handleFilters.bind(this)} showSessionSelector />
                    <SalesSummary />
                    <SaleCharts />
                </Segment>
            </div>
        )
    }
}
export default connect(
    ( store ) => { return {} },
    ( dispatch ) => {
        return {
            fetchSession: bindActionCreators( sessionActions.fetch, dispatch ),
            fetchTypes: bindActionCreators( typesActions.fetch, dispatch ),
            fetchSales: bindActionCreators( salesActions.fetch, dispatch ),
            fetchComissions: bindActionCreators( comissionActions.fetch, dispatch ),
            fetchPayments: bindActionCreators( paymentActions.fetch, dispatch )
        }
    }
)(SummaryPage)
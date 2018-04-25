import React from 'react'

import Segment from '../components/ui/segment/Segment'

import SalesFilters from '../components/entitites/sales/SalesFilters'
import SalesSummary from '../components/salesSummary/SalesSummary'
import SaleCharts from '../components/entitites/sales/SaleCharts'
import SalesTable from '../components/entitites/sales/SalesTable'

import { crud as typesActions } from '../redux/actions/types'
import { crud as salesActions } from '../redux/actions/sales'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SummaryPage extends React.Component {
    componentWillMount() {
        this.props.fetchTypes()
        this.props.fetchSales()
    }

    render() {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">RESUMEN DE VENTAS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <SalesFilters showSessionSelector />
                    <SalesSummary />
                    <SaleCharts />
                    <SalesTable hideActions={true} /> 
                </Segment>
            </div>
        )
    }
}
export default connect(
    ( store ) => { return {} },
    ( dispatch ) => {
        return {
            fetchTypes: bindActionCreators( typesActions.fetch, dispatch ),
            fetchSales: bindActionCreators( salesActions.fetch, dispatch )
        }
    }
)(SummaryPage)
import React from 'react'
import Segment from '../../ui/segment/Segment'
import { connect } from 'react-redux'

import moment from 'moment'
import { Line } from 'react-chartjs-2'

class SaleCharts extends React.Component {
    render() {
        const { sales } = this.props

        return(
            <Line
                data={sales}
            />
        )
    }
}
export default connect( store => {
    const salesMap = store.sales.data
    
    const salesByDate = {}
    salesMap.forEach( sale => {
        const saleDay = moment( sale.created_at ).format('DD/MM/YYYY');
        if( !salesByDate[ saleDay ] ) {
            salesByDate[ saleDay ] = 1;
        } else {
            salesByDate[ saleDay ]++;
        }
    });

    const labels = [];
    const data = [];
    Object.keys( salesByDate ).forEach( date => {
        labels.push( date );
        data.push( salesByDate[ date ] );
    });
    
    return {
        sales: {
            labels: labels, 
            datasets: [{
                label: 'VENTAS',
                data: data,
                fill: false,
                borderColor: 'lightgreen',
                lineTension: 0.25
            }],
        },
    }
})(SaleCharts)
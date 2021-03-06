import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'
import { Bar } from 'react-chartjs-2'

class SaleCharts extends React.Component {
    render() {
        const { sales } = this.props

        return(
            <div style={{height:'400px'}}>
                <Bar
                    data={sales}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}
export default connect( store => {
    const salesMap = store.sales.data
    const sortedSales = salesMap.sort( (a,b) => moment( b.created_at ).isBefore( moment(a.created_at) ) )

    const salesByDate = {}
    sortedSales.forEach( sale => {
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
                borderColor: 'darkgreen',
                backgroundColor: 'lightgreen'
            }],
        },
    }
})(SaleCharts)
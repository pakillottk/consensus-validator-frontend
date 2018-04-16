import React from 'react'

import Table from '../ui/table/Table'
import Segment from '../ui/segment/Segment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud } from '../../redux/actions/codes'

const tableFields = [
    {
        name: 'type',
        label: 'TIPO',
        type:'input'
    },
    {
        name: 'scanned',
        label: 'ESCANEADOS',
        type:'input'
    },
    {
        name: 'total',
        label: 'TOTAL',
        type:'input'
    },
    {
        name: 'remaining',
        label: 'QUEDAN',
        type:'input'
    },
    {
        name:'out',
        label: 'FUERA',
        type:'input'
    }
]

class ScanSummary extends React.Component {
    componentWillMount() {
        this.props.fetch( '?session=' + this.props.sessionId )
    }

    getSummaryData( codes ) {
        const output = []
        const totals = {
            type: 'TOTAL',
            scanned: 0,
            total: 0,
            remaining: 0,
            out: 0
        }
        const data = {}
        
        codes.forEach( code => {
            if( !data[ code.type_id ] ) {
                data[ code.type_id ] = {
                    type: code.type,
                    scanned: code.validations > 0 ? 1 : 0,
                    total: 1,
                    remaining: code.validations > 0 ? 0 : 1,
                    out: code.out ? 1 : 0
                }
            } else {
                data[ code.type_id ].total++
                data[ code.type_id ].remaining++
                if( code.validations > 0 ) {
                    data[ code.type_id ].scanned++
                    data[ code.type_id ].remaining--
                }
                if( code.out ) {
                    data[ code.type_id ].out++
                }
            }
        })

        Object.keys( data ).forEach( summaryDataKey => {
            const summaryData = data[ summaryDataKey ]
            output.push( summaryData )
            
            totals.scanned += summaryData.scanned
            totals.total += summaryData.total
            totals.remaining += summaryData.remaining
            totals.out += summaryData.out
        })

        return { summary: output, totals: totals }
    }

    render() {
        const summaryData = this.getSummaryData( this.props.codes )
        return(
            <div>
                <Table
                    full
                    items={summaryData.summary}
                    fields={tableFields}
                />
                <Segment>
                    <h3 style={{textAlign:'center'}}>
                        TOTAL ESCANEADOS: {summaryData.totals.scanned} / {summaryData.totals.total} 
                    </h3>
                    <h3 style={{textAlign:'center'}}>
                        (Quedan fuera: {summaryData.totals.out}. No escaneados: {summaryData.totals.remaining})
                    </h3>
                </Segment>
            </div>
        )
    }
}

export default connect( 
    ( store, props ) => {
        return {
            codes: store.codes.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( ScanSummary );
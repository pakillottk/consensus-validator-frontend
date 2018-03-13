import React from 'react'
import { connect } from 'react-redux'

import Segment from '../ui/segment/Segment'
import Table from '../ui/table/Table'

class CSVPreview extends React.Component {
    getFields( csvData ) {
        const fields = []
        const fieldsNames = Object.keys( csvData[ 0 ] )
        fieldsNames.forEach( fieldName => {
            fields.push({label: fieldName, name: fieldName})
        })

        return fields
    }

    render() {
        const { csvData } = this.props
        if( csvData.length === 0 ) {
            return <p style={{margin: '0 5px'}}>No hay datos que mostrar</p>
        }

        const fields = this.getFields( csvData )
        return(
            <div>
                <Segment secondary>
                    <h4 style={{textAlign:'center'}}>TOTAL: {csvData.length} elementos</h4>
                </Segment>
                <Table
                    scrollable
                    fields={fields}
                    items={csvData}
                />
            </div>
        )
    }
}
export default connect(
    ( store ) => {
        return {
            csvData: store.csv.data
        }
    }
)(CSVPreview)
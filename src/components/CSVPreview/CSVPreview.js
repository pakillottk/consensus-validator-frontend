import React from 'react'
import { connect } from 'react-redux'

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
            <Table
                fields={fields}
                items={csvData}
            />
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
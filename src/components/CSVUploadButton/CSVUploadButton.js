import React from 'react'
import Button from '../ui/button/Button'

import { crud } from '../../redux/actions/codes'
import { CSVLoaded } from '../../redux/actions/csv'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Admin } from '../auth/authLevels'

class CSVUploadButton extends React.Component {
    uploadCodes() {
        const { sessionId, csvData, createCode, CSVLoaded } = this.props
        csvData.forEach( code => {
            if( !code.code ) {
                return
            }
            delete code[""]
            createCode( code, '?session=' + sessionId )
        });

        CSVLoaded({ data: [] })
    }

    render() {
        const { csvData } = this.props
        return(
            <Button onClick={this.uploadCodes.bind(this)} full context="relevant" disabled={csvData.length <= 0}>SUBIR CSV</Button>
        )
    }
}
export default connect( 
    store => {
        return {
            csvData: store.csv.data
        }
    },
    dispatch => {
        return {
            createCode: bindActionCreators( crud.create, dispatch ),
            CSVLoaded: bindActionCreators( CSVLoaded, dispatch )
        }
    }
)(Admin(CSVUploadButton, true))
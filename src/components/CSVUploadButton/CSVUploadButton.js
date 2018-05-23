import React from 'react'
import Button from '../ui/button/Button'

import { crud } from '../../redux/actions/codes'
import { CSVLoaded } from '../../redux/actions/csv'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Admin } from '../auth/authLevels'

import SplitUploader from '../../utils/SplitUploader'

class CSVUploadButton extends React.Component {
    uploadCodes() {
        const { sessionId, createCode, csvData, CSVLoaded } = this.props
        const upload = []
        csvData.forEach( code => {
            if( !code.code ) {
                return
            }
            delete code[""]
            upload.push( code )
        });
        SplitUploader( upload, ( uploading, remaining ) => {
            createCode( {codes: JSON.stringify(uploading)}, '?session=' + sessionId )
            CSVLoaded({ data: remaining||[] })
        })
    }

    splitUpload( codes, limit=500, delay=250 ) {
        const { sessionId, createCode, CSVLoaded } = this.props
        let upload
        let remaining
        if( codes.length > limit ) {
            upload = codes.slice( 0, limit )
            remaining = codes.slice( limit, codes.length )
        }
        if( upload ) {
            createCode( {codes: JSON.stringify(upload)}, '?session=' + sessionId )
            CSVLoaded({ data: remaining })
            if(remaining ) {
                setTimeout( () => this.splitUpload(remaining), delay )
            }
        }
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
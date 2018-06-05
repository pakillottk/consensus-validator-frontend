import React from 'react'
import Papa from 'papaparse'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CSVLoaded } from '../../../../redux/actions/csv'
import { Admin } from '../../../auth/authLevels'

class CSVInput extends React.Component {
    constructor( props ) {
        super( props )

        this.handleFieldSelect = this.handleFieldSelect.bind( this )
    }

    handleFieldSelect( event ) {
        const file = event.target.files[ 0 ]
        if( !file ) {
            this.props.CSVLoaded( { data: [] } )
            return;
        }

        Papa.parse( file, {
            header: true,
            dynamicTyping: false,
            complete: ( results ) => {
                this.props.CSVLoaded( results )
            }
        })
    }

    render() {
        return(
            <input type="file" accept='.csv' onChange={this.handleFieldSelect}/>
        )
    }
}
export default connect(
    () => { return {} },
    ( dispatch ) => {
        return {
            CSVLoaded: bindActionCreators( CSVLoaded, dispatch )
        }
    }
)(Admin(CSVInput, true))
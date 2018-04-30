import React from 'react'

import Segment from '../../ui/segment/Segment'
import { crud } from '../../../redux/actions/comissions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import ComissionsForm from './ComissionsForm'
import Currency from 'react-currency-formatter'

class PaymentsTable extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.sessionId ? '?session='+this.props.sessionId : '' )
    }

    render() {
        const { comissions } = this.props
        return(
            <div>
                <EntityTable 
                    schema={schema}
                    hidden={{user_id: true, session_id: true}} 
                    items={comissions} 
                    formTitle="EDITAR COMISIÓN"
                    Form={ComissionsForm}
                    full 
                />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            comissions: store.comissions.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(PaymentsTable)
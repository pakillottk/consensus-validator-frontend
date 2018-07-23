import React from 'react'

import { crud } from '../../../redux/actions/sessionsupervisors'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import SessionSupervisorForm from './SessionSupervisorForm'

class SessionSupervisorsTable extends React.Component {
    componentWillMount() {
        this.props.fetch('?session='+this.props.sessionId);
    }

    render() {
        const { supervisors } = this.props
        return(
            <EntityTable 
                schema={schema} 
                items={supervisors} 
                hidden={{user_id:true,session_id:true}}
                formTitle="EDITAR AUTORIZACIÓN"
                Form={SessionSupervisorForm}
                full 
            />
        )
    }
}

export default connect(
    ( store ) => {
        return {
            supervisors: store.sessionsupervisors.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(SessionSupervisorsTable)
import React from 'react'

import { crud } from '../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class SessionsTable extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    render() {
        const { sessions, onItemClick } = this.props
        return(
            <EntityTable 
                schema={schema} 
                items={sessions} 
                full 
                onItemClick={ onItemClick ? onItemClick : ( () => {} ) }
            />
        )
    }
}

export default connect(
    ( store ) => {
        return {
            sessions: store.sessions.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(SessionsTable)
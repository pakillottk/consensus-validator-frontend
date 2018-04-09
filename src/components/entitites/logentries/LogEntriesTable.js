import React from 'react'

import { crud } from '../../../redux/actions/logentries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class LogEntriesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { logentries } = this.props
        return(
            <EntityTable
                schema={schema}
                items={logentries}
                hidden={{type_id: true, user_id: true}}
                scrollable
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            logentries: store.logentries.data
                        .sort( (a,b) => {
                            if( a.date < b.date ) { return 1; }
                            if( a.date > b.date ) { return -1; }
                            if( a.date === b.date ) { return 0; }
                        })
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(LogEntriesTable)
import React from 'react'

import { crud } from '../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import moment from 'moment'

class SessionsTable extends React.Component {
    componentWillMount() {
        //this.props.fetch();
    }

    render() {
        const { sessions, onItemClick } = this.props
        return(
            <EntityTable 
                schema={schema} 
                items={sessions} 
                hidden={{logos_img:true, company_id: true, sellers_locked_at: true, ticketoffice_closed_at: true}}
                full 
                onItemClick={ onItemClick ? onItemClick : ( () => {} ) }
            />
        )
    }
}

export default connect(
    ( store ) => {
        return {
            sessions: store.sessions.data.sort( ( a, b ) =>  {
                const aDate = moment( a.date );
                const bDate = moment( b.date );
                if( aDate.isBefore( bDate ) ) { return -1; }
                if( aDate.isAfter( bDate ) ) { return 1; }
        
                return 0;
            })
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(SessionsTable)
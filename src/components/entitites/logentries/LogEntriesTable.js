import React from 'react'

import Segment from '../../ui/segment/Segment'

import { crud } from '../../../redux/actions/logentries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import LogEntriesFilters from './LogEntriesFilters'

class LogEntriesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    render() {
        const { logentries, ammount, success, failures, info, sessionId } = this.props
        return(
            <div>
                <LogEntriesFilters sessionId={sessionId} />
                <Segment secondary>
                    <div style={{display: 'flex', fontSize: '1.12rem',flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{marginRight: '10px'}}>
                            <p>ÉXITOS</p>
                            <h4 style={{textAlign: 'center', color: 'darkgreen'}}>{success}</h4>
                        </div>
                        <div style={{marginRight: '10px'}}>
                            <p>ERRORES</p>
                            <h4 style={{textAlign: 'center', color: 'red'}}>{failures}</h4>
                        </div>
                        <div>
                            <p>INFORMACIÓN</p>
                            <h4 style={{textAlign: 'center', color: 'blue'}}>{info}</h4>
                        </div>
                    </div>
                    <h3 style={{textAlign: 'center', fontSize: '1.14rem', marginTop: '10px'}}>TOTAL SUCESOS: {ammount}</h3>
                </Segment>
                <EntityTable
                    schema={schema}
                    items={logentries}
                    hidden={{type_id: true, user_id: true}}
                    scrollable
                    full
                />
            </div>
        )
    }
} 

export default connect(
    ( store ) => {
        const logentries = store.logentries.data
                            .sort( (a,b) => {
                                if( a.date < b.date ) { return 1; }
                                if( a.date > b.date ) { return -1; }
                                if( a.date === b.date ) { return 0; }
                            })
        let success = 0;
        let failures = 0;
        let info = 0;
        logentries.forEach( entry =>  {
            switch( entry.level ) {
                case 'success': {
                    success++
                    break
                }
                case 'error': {
                    failures++
                    break
                }
                case 'info': {
                    info++
                    break
                }
            }
        })

        return {
            logentries,
            success,
            failures,
            info,
            ammount: logentries.size 
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(LogEntriesTable)
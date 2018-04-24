import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { crud } from '../../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

class SessionSelector extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    getSessionsAsOptions( sessions ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        sessions.forEach(
            session => {
                options.push({
                    value: session.id,
                    text: session.name + ' (' + moment(session.date).format('DD/MM/YYYY') + ')'
                })
            }
        );

        return options;
    }

    render() {
        const { name, disabled, sessions, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getSessionsAsOptions( sessions ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            sessions: store.sessions.data
        }
    },
    dispatch => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( SessionSelector )
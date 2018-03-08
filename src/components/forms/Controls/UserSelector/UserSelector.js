import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { crud } from '../../../../redux/actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class UserSelector extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    getUsersAsOptions( users ) {
        const options = [];
        users.forEach(
            user => {
                options.push({
                    value: user.id,
                    text: user.username
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, users, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getUsersAsOptions( users ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            users: store.users.data
        }
    },
    dispatch => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( UserSelector )
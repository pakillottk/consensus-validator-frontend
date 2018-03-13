import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { crud } from '../../../../redux/actions/roles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class RoleSelector extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    getRolesAsOptions( roles ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        roles.forEach(
            role => {
                options.push({
                    value: role.id,
                    text: role.role
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, roles, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getRolesAsOptions( roles ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            roles: store.roles.data
        }
    },
    dispatch => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( RoleSelector )
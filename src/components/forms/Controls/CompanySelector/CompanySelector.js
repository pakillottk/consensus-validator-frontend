import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { crud } from '../../../../redux/actions/companies'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CompanySelector extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    getCompaniesAsOptions( companies ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        companies.forEach(
            company => {
                options.push({
                    value: company.id,
                    text: company.name + ' (' + company.nif + ')'
                })
            }
        );

        return options;
    }

    render() {
        const { name, disabled, companies, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getCompaniesAsOptions( companies ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            companies: store.companies.data
        }
    },
    dispatch => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( CompanySelector )
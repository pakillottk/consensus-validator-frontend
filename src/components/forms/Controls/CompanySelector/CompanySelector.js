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
        const options = [];
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
        const { companies, onChange, value } = this.props;

        return(
           <Select onChange={onChange} value={value} options={ this.getCompaniesAsOptions( companies ) } /> 
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
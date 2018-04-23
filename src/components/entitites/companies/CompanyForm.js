import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/companies'
import CompanyValidator from '../../forms/Validators/CompanyValidator'
import RemoveCompanyButton from './RemoveCompanyButton'

const Form = EntityForm( 'companies', crud, Schema, 'COMPAÑÍA', CompanyValidator )
export default class CompanyForm extends React.Component {
    render() {        
        return(
            <div>
                <Form id={this.props.id} multipart={true} />  
                { this.props.id && <RemoveCompanyButton id={this.props.id} /> }
            </div>
        ) 
    }
}
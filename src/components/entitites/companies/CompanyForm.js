import React from 'react';

import Schema from './Schema'
import EntityForm from '../EntityForm'

import { crud } from '../../../redux/actions/companies'
import CompanyValidator from '../../forms/Validators/CompanyValidator'

const Form = EntityForm( 'companies', crud, Schema, 'COMPAÑÍA', CompanyValidator )
export default class CompanyForm extends React.Component {
    render() {        
        return <Form id={this.props.id} />
    }
}
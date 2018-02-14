import React from 'react';
import FormBuilder from './FormBuilder';
import CompanyValidator from './Validators/CompanyValidator';

import { crud } from '../../redux/actions/companies';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CompanyForm extends React.Component {
    submitCompany( data ) {        
        this.props.create( data );
    }

    render() {
        const toEdit = this.props.company || {};
        const fields = [
            {
                type:'input',
                name:'nif',
                label:'NIF',
                component: 'text' 
            },
            {
                type:'input',
                name:'name',
                label:'NOMBRE',
                component: 'text' 
            },
            {
                type:'input',
                name:'address',
                label:'DIRECCIÓN',
                component: 'text' 
            },
            {
                type:'input',
                name:'phone',
                label:'TELÉFONO',
                component: 'text' 
            },
            {
                type:'input',
                name:'email',
                label:'EMAIL',
                component: 'text' 
            },
        ];

        return(
            <FormBuilder 
                initialValues={toEdit}
                submit={this.submitCompany.bind(this)} 
                fields={fields} 
                validator={CompanyValidator} 
            />
        )
    }
}

export default connect(
    ( store ) => { return {}; },
    ( dispatch ) => {
        return {
            create: bindActionCreators( crud.create, dispatch )
        };
    }
)(CompanyForm);
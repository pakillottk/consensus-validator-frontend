import React from 'react';
import FormBuilder from '../../forms/FormBuilder';
import CompanyValidator from '../../forms/Validators/CompanyValidator';

import { crud } from '../../../redux/actions/companies';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CompanyForm extends React.Component {
    submitCompany( data ) {      
        const { company } = this.props
        if( !company ) {
            this.props.create( data );
        } else {
            this.props.update( company.id, data )
        }
    }

    render() {
        const toEdit = this.props.initialvalues || {};
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
                title="COMPAÑÍA"
                initialvalues={toEdit}
                submit={this.submitCompany.bind(this)} 
                fields={fields} 
                validator={CompanyValidator} 
                submitText={'GUARDAR'}
            />
        )
    }
}

export default connect(
    ( store, props ) => { 
        return {
            company: store.companies.data.get( props.initialvalues ? props.initialvalues.id : -1 )
        }; 
    },
    ( dispatch ) => {
        return {
            create: bindActionCreators( crud.create, dispatch ),
            update: bindActionCreators( crud.update, dispatch )
        };
    }
)(CompanyForm);
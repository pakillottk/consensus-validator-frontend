import React from 'react';

import API from '../API/API';

import FormBuilder from '../components/ui/form/FormBuilder';
import Validator from '../components/ui/form/Validators/Validator'
import Required from '../components/ui/form/Validators/Rules/Required'

export default class SessionsPage extends React.Component {
    render() {
        return(
            <div>
                <div>
                    SESIONES
                </div>
                <FormBuilder
                    validator={
                        new Validator({
                            foo: [ new Required() ]
                        })
                    } 
                    fields={[
                        {
                            type:'input',
                            name: 'foo',
                            label: 'FOO',
                            component: 'text'
                        },
                        {
                            type:'input',
                            name: 'bar',
                            label: 'BAR',
                            component: 'date'
                        },
                        {
                            type:'select',
                            name:'dummy',
                            label:'SELECT',
                            options:[
                                {label: 'A', value:'a'},
                                {label: 'B', value:'b'},
                            ]
                        }
                    ]}
                />
            </div>
        );
    }
}
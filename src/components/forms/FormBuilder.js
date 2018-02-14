import React from 'react';

import Form from '../ui/form/Form';
import Input from '../ui/form/Input/Input';
import Select from '../ui/form/Select/Select';
import UIThemeable from '../ui/UIThemeable';

class FormBuilder extends React.Component {
    constructor( props ) {
        super( props );

        const labels = {};
        props.fields.forEach( field => {
            labels[ field.name ] = field.label;
        })

        this.state = {
            fields: props.fields || [],
            labels,
            values: props.initialValues || {},
            errors: {}
        }

        this.handleFieldChange = this.handleFieldChange.bind( this );
    }

    handleSubmit( event ) {
        event.preventDefault();

        let { errors } = this.state;
        //Validate the form
        if( this.props.validator ) {
            errors = this.props.validator.validate( this.state.values );
            this.setState({ errors });
        }

        //Submit only when no errors
        if( Object.keys( errors ).length === 0 ) {
            this.props.submit( this.state.values );
        }
    }

    handleFieldChange( event ) {
        const values = {...this.state.values};
        values[ event.target.name ] = event.target.value;

        this.setState({ values });
    }

    renderSelect( index, field ) {
        const { values } = this.state;
        return(
            <Select 
                key={index} 
                name={ field.name } 
                value={values[ field.name ]} 
                options={ field.options }
                onChange={this.handleFieldChange}
            />
        );
    }

    renderInput( index, field ) {
        const { values } = this.state;
        return(
            <Input
                key={ index }
                type={field.component} 
                name={ field.name } 
                value={ values[ field.name ] } 
                onChange={this.handleFieldChange}
            />
        );
    }

    renderCustomField( index, field, Component ) {
        const { values } = this.state;
        return(
            <Component
                key={index}
                name={field.name}
                value={ values[ field.name ] } 
                onChange={this.handleFieldChange}
            />
        )
    }

    renderFields( fields ) {
        const output = [];
        fields.forEach( ( field, index ) => {
            output.push( <label key={fields.length + index}>{ field.label }</label> );

            if( field.type === 'input' ) {
                output.push(
                    this.renderInput( index, field )
                );
            } else if( field.type === 'select' ) {
                output.push(
                    this.renderSelect( index, field )
                )
            } else {
                output.push( this.renderCustomField( index, field, field.component ) );
            }
        });

        return output;
    }

    render() {
        const { labels, fields, errors } = this.state;
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <div style={{color:'red'}}>
                    { Object.keys( errors ).map( ( key, index ) => <p key={index}>{labels[key]}: {errors[key]} </p> ) }
                </div>
                
                {this.renderFields( fields )}

                <button type="submit">SUBMIT</button>
            </Form>
        );
    }
}

export default UIThemeable( FormBuilder );
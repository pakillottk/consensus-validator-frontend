import React from 'react';

import UIThemeable from '../UIThemeable';

class FormBuilder extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            fields: props.fields || [],
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
            <select key={ index } name={ field.name } value={values[ field.name ]} onChange={this.handleFieldChange}>
                { field.options.map( ( option, index ) => 
                    <option key={index} value={ option.value }>
                        {option.label}
                    </option>
                )}
            </select>
        );
    }

    renderInput( index, field ) {
        const { values } = this.state;
        return (
            <input 
                key={ index }
                type={field.component} 
                name={ field.name } 
                defaultValue={ values[ field.name ] } 
                onChange={this.handleFieldChange}
            />
        );
    }

    renderFields( fields ) {
        const output = [];
        fields.forEach( ( field, index ) => {
            output.push( <label key={9999 - index}>{ field.label }</label> );

            if( field.type === 'input' ) {
                output.push(
                    this.renderInput( index, field )
                );
            } else if( field.type === 'select' ) {
                output.push(
                    this.renderSelect( index, field )
                )
            } else {
                output.push( field.component );
            }
        });

        return output;
    }

    render() {
        const { fields } = this.state;
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                { this.renderFields( fields ) }

                <button type="submit">SUBMIT</button>
            </form>
        );
    }
}

export default UIThemeable( FormBuilder );
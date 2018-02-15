import React from 'react';

import Segment from '../ui/segment/Segment'
import Form from '../ui/form/Form';
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input';
import Select from '../ui/form/Select/Select';
import Button from '../ui/button/Button'
import UIThemeable from '../ui/UIThemeable';

class FormBuilder extends React.Component {
    constructor( props ) {
        super( props );

        const labels = {};
        if( props.fields ) {
            props.fields.forEach( field => {
                labels[ field.name ] = field.label;
            })
        }

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
                full
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
        if( !fields ) {
            return null;
        }

        const output = [];
        fields.forEach( ( field, index ) => {
            output.push( <Label key={fields.length + index}>{ field.label }</Label> );

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
        const { extErrors, title, secondary, submitText, submitColor, theme } = this.props;
        const allErrors = {...errors, ...extErrors };

        return(
            <div>
                <Segment secondary={!secondary}>
                    {title && <Segment secondary={secondary}>
                        <h2 className="center-aligned">{title}</h2>
                    </Segment>}
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <div style={{color:'red'}}>
                            { Object.keys( allErrors ).map( ( key, index ) => <p key={index}>{labels[key] || ''}: {errors[key]} </p> ) }
                        </div>
                        
                        {this.renderFields( fields )}

                        <Button type="submit" context={submitColor || 'possitive'}>{submitText || "Submit"}</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

export default UIThemeable( FormBuilder );
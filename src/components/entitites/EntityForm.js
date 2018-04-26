import React from 'react';
import FormBuilder from '../forms/FormBuilder';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ( reducer, actions, schema, title, validator  ) => {
    class Form extends React.Component {
        submitForm( data, initial ) {
            const { entity, dataTransformer } = this.props
            if( !entity ) {
                let submitData = {...initial, ...data}
                if( dataTransformer ) {
                    submitData = dataTransformer( submitData, false );
                }
                this.props.create( submitData );
            } else {
                let submitData = data
                if( dataTransformer ) {
                    submitData = dataTransformer( submitData, true );
                }
                this.props.update( entity.id, submitData )
            }
        }

        hideFields( hidden, fields ) {
            if( !hidden ) {
                return fields
            }

            const visibleFields = []
            fields.forEach( field => {
                if( !hidden[ field.name ] ) {
                    visibleFields.push( field )
                }
            })

            return visibleFields
        }

        getDefaultValues( fields ) {
            const defaultValues = {}
            fields.forEach( field => {
                if( field.defaultValue === undefined ) {
                    return
                }
                defaultValues[field.name] = field.defaultValue
            })

            return defaultValues
        }

        render() {
            const { defaultvalues, hidden, disabled, multipart, dataTransformer } = this.props
            const toEdit = {...defaultvalues, ...this.getDefaultValues( schema ), ...this.props.entity }
            return(
                <FormBuilder
                    title={title}
                    initialvalues={toEdit}
                    disabled={disabled}
                    multipart={multipart}
                    submit={this.submitForm.bind(this)} 
                    fields={this.hideFields( hidden, schema )} 
                    validator={validator} 
                    submitText={'GUARDAR'}
                    resetOnSubmit={!this.props.entity}
                />
            )
        }
    }

    return connect(
        ( store, props ) => { 
            return {
                entity: store[ reducer ].data.get( props.id ? props.id : -1 )
            }; 
        },
        ( dispatch ) => {
            return {
                create: bindActionCreators( actions.create, dispatch ),
                update: bindActionCreators( actions.update, dispatch )
            };
        }
    )(Form)
}
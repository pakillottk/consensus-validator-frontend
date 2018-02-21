import React from 'react';
import FormBuilder from '../forms/FormBuilder';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ( reducer, actions, schema, title, validator  ) => {
    class Form extends React.Component {
        submitForm( data ) {
            const { entity } = this.props
            if( !entity ) {
                this.props.create( data );
            } else {
                this.props.update( entity.id, entity )
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

        render() {
            const { hidden, disabled } = this.props
            const toEdit = this.props.entity || {}
            return(
                <FormBuilder
                    title={title}
                    initialvalues={toEdit}
                    disabled={disabled}
                    submit={this.submitForm.bind(this)} 
                    fields={this.hideFields( hidden, schema )} 
                    validator={validator} 
                    submitText={'GUARDAR'}
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
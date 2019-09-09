import React from 'react';
import FormBuilder from '../forms/FormBuilder';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ( reducer, actions, schema, title, validator  ) => {
    class Form extends React.Component {
        constructor(props)
        {
            super(props)

            this.state = {
                overridenId: null,
                overridenValues: null 
            }

            this.handleAutoComplete = this.handleAutoComplete.bind(this)
        }

        getEntity()
        {
            const { overridenId, overridenValues } = this.state
            const { id, entities} = this.props
            
            if(overridenId && overridenValues)
            {
                return overridenValues
            }

            return id ? entities.get( id ) : null
        }

        submitForm( data, initial ) {
            const { dataTransformer } = this.props
            const entity = this.getEntity()
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

        componentWillReceiveProps(nextProps)
        {
            // if(nextProps.id != this.props.id)
            // {
            //     this.overrideId(null, null)
            // }
            if(this.canNotifyIdChange())
            {
                if(
                    nextProps.lastCreated && 
                    nextProps.lastCreated[this.submitToken] &&
                    this.props.id !== nextProps.lastCreated.id)
                {
                    const data = nextProps.lastCreated[this.submitToken]
                    this.overrideId(data.id, data)
                } else if(nextProps.id != this.props.id)
                {
                    this.setState({overridenId: null, overridenValues: null})
                    // this.notifyIdChange()
                }
            }
        }

        componentWillUpdate(nextProps, nextState, nextContext)
        {
            if(nextState.overridenId != this.state.overridenId)
            {
                this.notifyIdChange(nextState.overridenId, nextState.overridenValues)
            }
        }

        canNotifyIdChange()
        {
            return this.props.onIdChanged
        }

        notifyIdChange(id, item)
        {
            if(this.canNotifyIdChange())
            {
                this.props.onIdChanged(id, item)
            }
        }

        overrideId(newID, values)
        {
            this.setState({overridenId: newID, overridenValues: values})
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

        handleAutoComplete(field, item)
        {
            if(!field.noUpdate)
            {
                this.overrideId(item.id, item)
                this.notifyIdChange(item.id, item)
            }
        }

        render() {
            const { defaultvalues, hidden, disabled, multipart } = this.props
            const toEdit = {...defaultvalues, ...this.getDefaultValues( schema ), ...this.getEntity() }
            return(
                <FormBuilder
                    title={title}
                    initialvalues={toEdit}
                    disabled={disabled}
                    multipart={multipart}
                    submit={this.submitForm.bind(this)} 
                    fields={this.hideFields( hidden, schema )} 
                    validator={validator}
                    autoCompleteConfirmed={this.handleAutoComplete} 
                    submitText={'GUARDAR'}
                    resetOnSubmit={!this.props.entity}
                />
            )
        }
    }

    return connect(
        ( store, props ) => { 
            const id = parseInt( props.id, 10 )
            return {
                id,
                entities: store[reducer].data
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
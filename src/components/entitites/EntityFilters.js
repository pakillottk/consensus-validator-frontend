import React from 'react'

import Button from '../ui/button/Button'
import FormBuilder from '../forms/FormBuilder'
import moment from 'moment'

export default ( schema, fetch ) => {
    return class EntityFilters extends React.Component {
        componentWillMount() {
            this.fetchNoFilters()
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
    
        validateSelector( data, field, toBoolean ) {
            if( data[field] ) {
                if( data[ field ] === '0' ) {
                    delete data[ field ]
                } else if( toBoolean ) {
                    data[ field ] = data[ field ] === toBoolean
                }
            }
    
            return data
        }
    
        validateString( data, field ) {
            if( data[ field ] ) {
                if( data[ field ].trim() === "" ) {
                    delete data[ field ]
                }
            }
    
            return data
        }
    
        handleSubmit( data, initial ) {
            const { fetchBaseQuery } = this.props
            const selectors = this.props.selectors || {}
            const queryParams = []
            Object.keys( data ).forEach( field => {
                if( selectors[ field ] ) {
                    data = this.validateSelector( data, field, selectors[ field ].toBoolean )
                } else if( moment.isMoment( data[ field ] ) ) {
                    data[ field ] = data[field].toISOString()
                } else {
                    data = this.validateString( data, field )
                }

                queryParams.push( field + '=' + data[ field ] )
            })

            const queryString = '?' + (fetchBaseQuery ? fetchBaseQuery + '&' : '') + queryParams.join( '&' )
            fetch( queryString )
        }
    
        fetchNoFilters() {
            const { fetchBaseQuery } = this.props
            fetch( '?' + fetchBaseQuery )
        }
    
        render() {
            const { hidden, title, submitText } = this.props
            return(
                <div>
                    <FormBuilder
                        vertical
                        title={title}
                        initialvalues={this.getDefaultValues( schema )}
                        submit={this.handleSubmit.bind(this)} 
                        fields={this.hideFields( hidden, schema )}  
                        submitText={submitText || 'BUSCAR'}
                        resetOnSubmit={false}
                    />
                    <Button styles={{margin: 0}} context="relevant" onClick={() => this.fetchNoFilters()} full>VER TODOS</Button>
                </div>
            )
        }
    }
}
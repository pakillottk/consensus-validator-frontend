import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import FormBuilder from '../../forms/FormBuilder'

class CodeFilters extends React.Component {
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

    validateSelector( data, field ) {
        if( data[field] ) {
            if( data[ field ] === '0' ) {
                delete data[ field ]
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
        const { fetch, sessionId } = this.props
        
        data = this.validateSelector( data, 'out' )
        if( data.out ) {
            data.out = data.out === '1'            
        }
        data = this.validateSelector( data, 'type_id' )
        data = this.validateString( data, 'code' )
        data = this.validateString( data, 'name' )
        data = this.validateString( data, 'email' )

        const queryParams = []
        Object.keys( data ).forEach( field => {
            queryParams.push( field + '=' + data[ field ] )
        })
        const queryString = '?session=' + sessionId + '&' + queryParams.join( '&' )

        fetch( queryString )
    }

    fetchNoFilters() {
        const { fetch, sessionId } = this.props
        fetch( '?session=' + sessionId )
    }

    render() {
        const { hidden } = this.props
        return(
            <div>
                <FormBuilder
                    vertical
                    title="BUSCAR CÓDIGOS"
                    initialvalues={this.getDefaultValues( schema )}
                    submit={this.handleSubmit.bind(this)} 
                    fields={this.hideFields( hidden, schema )}  
                    submitText={'BUSCAR'}
                    resetOnSubmit={false}
                />
                <Button context="relevant" onClick={() => this.fetchNoFilters()} full>VER TODOS</Button>
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(CodeFilters)
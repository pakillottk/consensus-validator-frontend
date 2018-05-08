import React from 'react'
import ThemeStyles from '../ui/ThemeStyles'

import Segment from '../ui/segment/Segment'
import Form from '../ui/form/Form'
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input'

const themeFields = []
Object.keys( ThemeStyles ).forEach( ( property ) => {
    if( ['font', 'padding', 'margin'].includes(property) ) {
        return
    }
    themeFields.push({
        name: property,
        label:property,
        type:'input',
        component:'color',
        defaultValue: ThemeStyles[ property ]
    })
})

class ThemeEditor extends React.Component {
    constructor( props ) {
        super( props )

        const initialValues = {}
        themeFields.forEach( field => {
            initialValues[ field.name ] = field.defaultValue
        })
        this.state = {
            fields: themeFields,
            values: initialValues
        }
        this.handleFieldChange = this.handleFieldChange.bind( this );
    }

    getValue( field ) {
        let data = this.state.values[ field.name ]
        if( field.inputFormat ) {
            data = field.inputFormat( data )
        }

        return data
    }

    handleFieldChange( event ) {
        event.preventDefault()

        const values = {...this.state.values}
        values[ event.target.name ] = event.target.value
        
        ThemeStyles[ event.target.name ] = event.target.value
        this.setState({values})
    }

    renderFields( fields ) {
        const output = []
        fields.forEach( (field, index) => {
            output.push( 
                <div key={index}>
                    <Label>{field.label}</Label>
                    <Input
                        key={ index }
                        type={field.component} 
                        name={ field.name } 
                        value={ this.getValue( field ) } 
                        onChange={this.handleFieldChange}
                        full
                    /> 
                </div>
            )
        })

        return output
    }

    render() {
        return(
            <Form>
                <Segment>
                    <h1 style={{textAlign:'center'}}>CONFIGURAR TEMA</h1>
                </Segment>
                {this.renderFields( themeFields )}
            </Form>
        )
    }
}

export default ThemeEditor
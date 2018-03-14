import React from 'react'
import Select from '../../ui/form/Select/Select'

export default class OutSelector extends React.Component {
    render() {
        const { name,  disabled, onChange, value } = this.props;
        return(
            <Select 
                name={name} 
                disabled={disabled} 
                onChange={onChange} 
                value={value} 
                options={[ { value: 0, text: "SELECCIONE" }, { value: 1, text: "FUERA" }, { value: 2, text: "DENTRO" } ]} 
            /> 
         )
    }
}
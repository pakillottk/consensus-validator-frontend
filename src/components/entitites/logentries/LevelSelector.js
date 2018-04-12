import React from 'react'
import Select from '../../ui/form/Select/Select'

export default class LevelSelector extends React.Component {
    render() {
        const { name,  disabled, users, onChange, value } = this.props;

        return(
           <Select 
            name={name} 
            disabled={disabled} 
            onChange={onChange} 
            value={value} 
            options={[
                {value: 0, text: 'SELECCIONE'},
                {value: 'info', text: 'INFO'},
                {value: 'success', text: 'ÉXITOS'},
                {value: 'error', text: 'ERRORES'},
            ]} /> 
        )
    }
}
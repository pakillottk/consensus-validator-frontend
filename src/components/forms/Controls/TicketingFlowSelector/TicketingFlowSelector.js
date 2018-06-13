import React from 'react'
import Select from '../../../ui/form/Select/Select'

export default class PayFormSelector extends React.Component {
    render() {
        const { name,  disabled, onChange, value } = this.props;

        return(
           <Select
                name={name} 
                disabled={disabled} 
                onChange={onChange} 
                value={value} 
                options={[
                    { value: 0, text:'SELECCIONE' },
                    { value: 'by_types', text:'POR TIPOS' },
                    { value: 'by_zones', text:'POR ZONAS' }
                ]} 
            /> 
        )
    }
}
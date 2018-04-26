import React from 'react'
import Select from '../../../ui/form/Select/Select'

export default class PayFormSelector extends React.Component {
    render() {
        const { name,  disabled, roles, onChange, value } = this.props;

        return(
           <Select
                name={name} 
                disabled={disabled} 
                onChange={onChange} 
                value={value} 
                options={[
                    { value: 0, text:'SELECCIONE' },
                    { value: 'cash', text:'A/CTA' },
                    { value: 'transfer', text:'TRANSFERENCIA' },
                    { value: 'check', text: 'CHEQUE' }
                ]} 
            /> 
        )
    }
}
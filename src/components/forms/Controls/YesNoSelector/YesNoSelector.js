import React from 'react'
import Select from '../../../ui/form/Select/Select'

export default class YesNoSelector extends React.Component {
    render() {
        const { name,  disabled, onChange, value } = this.props;

        return(
           <Select
                name={name} 
                disabled={disabled} 
                onChange={onChange} 
                value={value} 
                options={[
                    { value: 'true', text:'SÍ' },
                    { value: 'false', text:'NO' }
                ]} 
            /> 
        )
    }
}

import React from 'react'
import Select from '../../../ui/form/Select/Select'
import { connect } from 'react-redux'

class TypeSelector extends React.Component {
    getTypesAsOptions( types ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        types.forEach(
            type => {
                options.push({
                    value: type.id,
                    text: type.type + ' ' + type.price + '€'
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, types, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getTypesAsOptions( types ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            types: store.types.data
        }
    },
)( TypeSelector )
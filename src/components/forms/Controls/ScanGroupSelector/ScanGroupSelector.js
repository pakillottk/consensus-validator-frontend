import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { connect } from 'react-redux'

class ScanGroupSelector extends React.Component {
    getScanGroupsAsOptions( scangroups ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        scangroups.forEach(
            scangroup => {
                options.push({
                    value: scangroup.id,
                    text: scangroup.group
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, scangroups, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getScanGroupsAsOptions( scangroups ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            scangroups: store.scangroups.data
        }
    },
)( ScanGroupSelector )
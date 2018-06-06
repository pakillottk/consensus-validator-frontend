import React from 'react'
import Select from '../../../ui/form/Select/Select'
import { connect } from 'react-redux'

class RecintZoneSelector extends React.Component {
    getZonesAsOptions( zones ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        zones.forEach(
            zone => {
                options.push({
                    value: zone.id,
                    text: zone.zone
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, zones, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getZonesAsOptions( zones ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            zones: store.recintzones.data
        }
    }
)( RecintZoneSelector )
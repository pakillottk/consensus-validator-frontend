import React from 'react'
import Select from '../../../ui/form/Select/Select'

import { crud } from '../../../../redux/actions/recints'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class RecintSelector extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    getRecintsAsOptions( recints ) {
        const options = [{value: 0, text: 'SELECCIONE'}];
        recints.forEach(
            recint => {
                options.push({
                    value: recint.id,
                    text: recint.recint
                })
            }
        );

        return options;
    }

    render() {
        const { name,  disabled, recints, onChange, value } = this.props;

        return(
           <Select name={name} disabled={disabled} onChange={onChange} value={value} options={ this.getRecintsAsOptions( recints ) } /> 
        )
    }
}

export default connect(
    store => {
        return {
            recints: store.recints.data
        }
    },
    dispatch => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)( RecintSelector )
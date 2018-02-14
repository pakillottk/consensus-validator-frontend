import React from 'react';
import FormBuilder from './FormBuilder';

import { crud } from '../../redux/actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SessionForm extends React.Component {
    render() {
        const fields = [
            
        ];
    }
}

export default connect(
    ( store ) => { return {}; },
    ( dispatch ) => {
        return {
            create: bindActionCreators( crud.create, dispatch )
        };
    }
)(SessionForm);
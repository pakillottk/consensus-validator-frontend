import React from 'react';

import { loginSuccess } from '../../redux/actions/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CryptoService from '../../communication/crypto/CryptoService';
import AuthAPI from '../../API/APIAuthRouter';

class LoginGuard extends React.Component {
    async componentWillMount() {
        //LOGGED, DO NOTHING
        if( this.props.tokens !== null ) {
            return;
        }

        //Attempt to rearm auth data
        const cryptedTokens = window.localStorage.getItem( 'tokens' );
        if( cryptedTokens ) {
            const tokens = JSON.parse( 
                CryptoService.decrypt( cryptedTokens ) 
            );

            AuthAPI.setAuthHeaders( tokens );
            const me = await AuthAPI.getMe();

            this.props.loginSuccess( me, tokens );
        } else {
            //Can't login, go to Login page
            this.props.history.replace( '/' );
        }
    }

    render() {
        return null;
    }
}

export default connect(
    ( store ) => {
        return {
            tokens: store.auth.tokens
        }
    },
    ( dispatch ) => {
        return {
            loginSuccess: bindActionCreators( loginSuccess, dispatch )
        };
    }
)(LoginGuard);
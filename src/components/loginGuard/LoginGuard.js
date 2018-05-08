import React from 'react';

import { loginSuccess } from '../../redux/actions/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CryptoService from '../../communication/crypto/CryptoService';
import AuthAPI from '../../API/APIAuthRouter';

class LoginGuard extends React.Component {
    async attemptToLogin( storeTokens ) {
        //LOGGED, DO NOTHING
        if( storeTokens !== null ) {
            return;
        }

        //Attempt to rearm auth data
        const cryptedTokens = window.localStorage.getItem( 'tokens' );
        let tokens;
        if( cryptedTokens ) {
            //Decrypt the tokens
            tokens = JSON.parse( 
                CryptoService.decrypt( cryptedTokens ) 
            );
        } else {
            //Can't login, go to Login page
            this.props.history.replace( '/' );
            return;
        }

        try {
            //Attempt to use the stored access token
            AuthAPI.setAuthHeaders( tokens );
            const me = await AuthAPI.getMe();

            this.props.loginSuccess( me.data, tokens );
        } catch( error ) {
            try {
                //The token didn't work, attempt to refresh
                tokens = await AuthAPI.refresh( tokens );
                AuthAPI.setAuthHeaders( tokens );
                const me = await AuthAPI.getMe();

                this.props.loginSuccess( me.data, tokens );
            } catch( e ) {
                //The refresh token failed, have to relog
                this.props.history.replace( '/' );
            }
        }
    }

    componentWillMount() {
        if( this.props.location.pathname !== '/' ) {
            this.attemptToLogin( this.props.tokens )
        }
    }

    componentWillReceiveProps( nextProps ) {
        const { tokens } = nextProps
        this.attemptToLogin( tokens )
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
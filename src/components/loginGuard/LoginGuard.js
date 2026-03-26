import React from 'react';

import { loginSuccess, logout } from '../../redux/actions/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CryptoService from '../../communication/crypto/CryptoService';
import AuthAPI from '../../API/APIAuthRouter';

//Time to recheck the session
const SESSION_REFRESH_TIME = 1000 * 60 * 30; //30 minutes

class LoginGuard extends React.Component {
    constructor( props ) {
        super( props );
        this.refreshTimer = null;
        this.isCheckingSession = false;
    }

    clearRefreshTimer() {
        if( this.refreshTimer ) {
            clearTimeout( this.refreshTimer );
            this.refreshTimer = null;
        }
    }

    scheduleRefreshCheck() {
        this.clearRefreshTimer();
        this.refreshTimer = setTimeout( async () => {
            await this.attemptToLogin( this.props.tokens );
        }, SESSION_REFRESH_TIME );
    }

    readStoredTokens() {
        const cryptedTokens = window.localStorage.getItem( 'tokens' );
        if( !cryptedTokens ) {
            return null;
        }

        try {
            const decryptedTokens = CryptoService.decrypt( cryptedTokens );
            if( !decryptedTokens ) {
                return null;
            }

            return JSON.parse( decryptedTokens );
        } catch( e ) {
            return null;
        }
    }

    forceRelogin() {
        this.clearRefreshTimer();
        this.props.logout();

        if( this.props.location.pathname !== '/' ) {
            this.props.history.replace( '/' );
            // Fallback for edge cases where router navigation is blocked by stale tree state.
            if( window.location.pathname !== '/' ) {
                window.location.replace( '/' );
            }
        }
    }

    async attemptToLogin( storeTokens ) {
        if( this.isCheckingSession ) {
            return;
        }

        this.isCheckingSession = true;
        let tokens = storeTokens;

        try {
            if( !tokens ) {
                tokens = this.readStoredTokens();
            }

            if( !tokens ) {
                this.forceRelogin();
                return;
            }

            try {
                // Validate access token on every check (including when already logged in).
                AuthAPI.setAuthHeaders( tokens );
                const me = await AuthAPI.getMe();
                this.props.loginSuccess( me.data, tokens );
                this.scheduleRefreshCheck();
            } catch( error ) {
                // Access token expired/invalid: try refresh, then retry /me.
                tokens = await AuthAPI.refresh( tokens );
                AuthAPI.setAuthHeaders( tokens );
                const me = await AuthAPI.getMe();
                this.props.loginSuccess( me.data, tokens );
                this.scheduleRefreshCheck();
            }
        } catch( e ) {
            // Includes refresh failures and incompatible old encrypted sessions.
            this.forceRelogin();
        } finally {
            this.isCheckingSession = false;
        }
    }

    componentDidMount() {
        if( this.props.location.pathname !== '/' ) {
            this.attemptToLogin( this.props.tokens )            
        }
    }

    componentDidUpdate( prevProps ) {
        const pathnameChanged = prevProps.location.pathname !== this.props.location.pathname;
        const tokensChanged = prevProps.tokens !== this.props.tokens;

        if( pathnameChanged || tokensChanged ) {
            if( this.props.location.pathname !== '/' ) {
                this.attemptToLogin( this.props.tokens );
            } else {
                this.clearRefreshTimer();
            }
        }
    }

    componentWillUnmount() {
        this.clearRefreshTimer();
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
            loginSuccess: bindActionCreators( loginSuccess, dispatch ),
            logout: bindActionCreators( logout, dispatch )
        };
    }
)(LoginGuard);
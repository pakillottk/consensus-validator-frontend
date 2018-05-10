import API from '../../API/API'
import CryptoService from '../../communication/crypto/CryptoService';

const reducer = ( state = {
    me: null,
    tokens: null
}, action ) => {
    switch( action.type ) {
        case 'LOGIN_SUCCESS': {
            const { tokens, me } = action.payload;
            delete me.password
            me.role = me.role.role

            //Cache company logo in browser
            if( me.company ) {
                if( me.company.logo_url ) {
                    (new Image()).src = API.getFullPath( me.company.logo_url )
                }
            }

            const tokensStr = JSON.stringify( tokens );
            const cryptedTokens = CryptoService.encrypt( tokensStr );

            window.localStorage.removeItem( 'tokens' );
            window.localStorage.setItem( 'tokens', cryptedTokens );

            return {...state, me: me, tokens: tokens};
        }

        case 'LOGOUT': {
            window.localStorage.removeItem( 'tokens' );
            return {...state, me: null, tokens: null };
        }

        default: {
            return state;
        }
    }
}

export default reducer;
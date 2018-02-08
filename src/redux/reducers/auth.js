import CryptoService from '../../communication/crypto/CryptoService';

const reducer = ( state = {
    me: null,
    tokens: null
}, action ) => {
    switch( action.type ) {
        case 'LOGIN_SUCCESS': {
            const { tokens, me } = action.payload;

            const tokensStr = JSON.stringify( tokens );
            window.localStorage.setItem( 'tokens', CryptoService.encrypt( tokensStr ) );

            return {...state, me: me, tokens: tokens};
        }
    }

    return state;
}

export default reducer;
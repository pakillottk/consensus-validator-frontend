export const loginSuccess = ( me, tokens ) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            me: me,
            tokens: tokens
        }
    }
} 
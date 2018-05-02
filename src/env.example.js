export const env = {
    //API Connection
    api: {
        protocol: '', //http|https
        host: '', //IP|hostname(example: xxx.com)
        port: ''
    },
    //Auth server config
    auth: {
        loginPath: '', //Path in the API (example: /login)
        logoutPath: '', //Path in the API (example: /logout)
        mePath: '', //Where get logged user data (example: /me)
        client_id: 0, //OAuth client_id
        client_secret: '', //OAuth client_secret
        grant_type: 'password' //OAuth grant_type
    },
    //CRYPTO Module config
    crypto: {
        alg: 'aes-256-ctr', //Alg to use by Crypto
        passphrase: '' //Passphrase for the app
    },
    //Socket.io config
    io: {
        protocol: '', //http|https
        host: '', //IP|hostname(example: xxx.com)
        port: ''
    }
}
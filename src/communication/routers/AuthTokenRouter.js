import Headers from '../headers/StandardFormUrlEncodedHeaders'
import Request from '../Request';
import { env } from '../../env';

class AuthTokenRouter {
    constructor( connection, authPaths ) {
        this.connection = connection;
        this.authPaths  = authPaths;
    }

    getClientParams( data ) {
        return {
            client_id: env.auth.client_id,
            client_secret: env.auth.client_secret,
            grant_type: env.auth.grant_type
        };
    }

    ObjectToURLEnconded( obj ) {
        const params = [];
        Object.keys( obj ).forEach(
            ( key ) => {
                params.push( key + '=' + encodeURIComponent( obj[ key ] ) );
            }
        )

        return params.join( '&' );
    }

    async attemptLogin( data ) {   
        data = {...this.getClientParams(), ...data};
        const request = new Request( this.ObjectToURLEnconded( data ), new Headers() );        
        const response = await this.connection.post( this.authPaths.login, request );
        const tokens = {
            token: response.data.access_token,
            refreshToken: response.data.refresh_token
        };

        this.setAuthHeaders( tokens )

        return tokens;
    }

    setAuthHeaders( tokens ) {
        this.connection.updateHeaders( 'Authorization', 'Bearer ' + tokens.token );
    }

    async getMe() {
        return await this.connection.get( env.auth.mePath );
    }


    async refresh( tokens ) {
        const data = {...this.getClientParams(), refresh_token: tokens.refreshToken, grant_type: 'refresh_token' }; 
        const request = new Request( this.ObjectToURLEnconded(data), this.connection.headers.headers )
        const response = await this.connection.post( this.authPaths.refresh, request );

        const accessToken  = response.data.data.access_token;
        const refreshToken = response.data.data.refresh_token;

        this.connection.updateHeaders( 'Authorization', 'Bearer ' + accessToken );

        return {
            token: accessToken,
            refreshToken
        }
    }

    async logout() {
        const request  = new Request( {}, this.connection.headers.headers ); 
        await this.connection.post( this.authPaths.logout, request );
        this.connection.removeHeader( 'Authorization' );
    }
}

export default AuthTokenRouter;
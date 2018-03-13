import axios   from 'axios';
import Headers from '../headers/Headers';

class Connection {
    constructor( protocol, host, port, headersObj ) {
        this.protocol = ( protocol || 'http' ) + '://';
        this.host     = ( host || 'localhost' );
        this.port     = ':' + ( port || ( this.protocol === 'https://' ? 443 : 80 ) );
        this.headers  = new Headers();

        if( headersObj ) {
            this.headers = headersObj;
        } 
    }

    updateHeaders( key, value ) {
        this.headers.set( key, value );
    }

    removeHeader( key ) {
        delete this.headers.headers[ key ];
    }

    basePath() {
        return this.protocol + this.host + this.port;
    }

    getFullPath( path ) {
        if( path[0] !== '/' ) {
            path = '/' + path;
        }

        return this.basePath() + path;
    }

    getHeaders( request ) {
        return request ? request.headers : this.headers.headers;
    }

    getQuery( request ) {
        return request ? request.query : '';
    }

    get( path, request ) {  
        return axios.get( this.getFullPath( path ) + this.getQuery( request ), { headers: this.getHeaders( request ) } );
    }

    post( path, request ) {
        return axios.post( this.getFullPath( path ) + this.getQuery( request ), request.input, { headers: this.getHeaders( request ) } );
    }

    put( path, request ) {
        return axios.put( this.getFullPath( path ), request.input, { headers: this.getHeaders( request ) } );
    }

    delete( path, request ) {
        return axios.delete( this.getFullPath( path ), { headers: this.getHeaders( request ) } );
    }
}

export default Connection;
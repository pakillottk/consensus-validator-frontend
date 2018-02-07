class Headers {
    constructor( headers ) {
        this.headers = headers || {};
    }

    set( key, value ) {
        this.headers[ key ] = value;
        return this.headers[ key ];
    }

    get( key ) {
        return this.headers[ key ];
    }
}

export default Headers;
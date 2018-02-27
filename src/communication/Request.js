class Request {
    constructor( input, headers, query ) {
        this.input = input || {};
        this.headers = headers || {};
        this.query = query || '';
    }

    getInput( key ) {
        return this.input[ key ];
    }

    setInput( key, value ) {
        this.input[ key ] = value;
        return this.input[ key ];
    }
}

export default Request;
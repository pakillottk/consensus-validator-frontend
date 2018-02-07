class Request {
    constructor( input, headers ) {
        this.input = input || {};
        this.headers = headers || {};
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
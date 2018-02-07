import Headers from './Headers';

class StandardFormUrlEncodedHeaders extends Headers {
    constructor( headers ) {
        const defaultConfig = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        if( headers ) {
            super( {...defaultConfig, headers } );    
        } else {
            super( defaultConfig );
        }        
    }
}

export default StandardFormUrlEncodedHeaders;
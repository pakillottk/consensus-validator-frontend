import EntityReducer from './generators/EntityReducer';

const preprocessor = ( code ) => {
    if( code.type ) {
        code.type = code.type.type
    }

    return code
}

export default EntityReducer( 'Codes', {}, preprocessor );
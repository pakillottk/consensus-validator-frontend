import EntityReducer from './generators/EntityReducer';

const preprocessor = ( code ) => {
    if( code.type ) {
        code.type = code.type.type
    }

    return code
}

const generateCodes = ( state, action ) => {
    const items = action.payload.data
    let codes = state.data
    items.forEach( item => {
        codes = codes.set( item.id, preprocessor(item) )
    });

    return {...state, data: codes}
}

export default EntityReducer( 'Codes', { 'CODE_GENERATION_FULFILLED': generateCodes }, preprocessor );
export default ( state = { data: [] }, action ) => {
    switch( action.type ) {
        case 'CSV_LOADED':{
            return {...state, data: action.payload.data }
        }
    }

    return state;
}
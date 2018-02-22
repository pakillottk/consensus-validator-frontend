import { Map } from 'immutable';

export const onFetch = ( preprocessor ) => ( state, action ) => {
    let data = Map();
    action.payload.data.forEach( item => {
        data = data.set( item.id, preprocessor( item ) );
    });

    return {...state, data };
}

export const onCreation = ( preprocessor ) => ( state, action ) => {
    const item = action.payload.data;
    let data = state.data.set( item.id, preprocessor( item ) );
    return {...state, data };
}

export const onUpdate = ( preprocessor ) => ( state, action ) => {
    const item = action.payload.data;
    let data = state.data.set( item.id, preprocessor( item ) );
    return {...state, data };
}

export const onDelete = ( state, action ) => {
    let data = state.data.delete( action.meta.deleted_id );
    return {...state, data };
}

const builder = ( entity, validActions, preprocessor ) => {
    preprocessor = preprocessor || ( ( item ) => { return item; } );
    const prefix = entity.toUpperCase();
    let validTypes = {};
    validTypes[ prefix + '_' + 'FETCH_FULFILLED' ]  = onFetch( preprocessor );
    validTypes[ prefix + '_' + 'CREATE_FULFILLED' ] = onCreation( preprocessor );
    validTypes[ prefix + '_' + 'UPDATE_FULFILLED' ] = onUpdate( preprocessor );
    validTypes[ prefix + '_' + 'DELETE_FULFILLED' ] = onDelete;

    validTypes = {...validTypes, ...validActions};

    return ( state = { data: Map() }, action ) => {
        const stateCreator = validTypes[ action.type ];
        if( stateCreator ) {
            return stateCreator( state, action );
        }
        return state;
    }
};

export default builder;
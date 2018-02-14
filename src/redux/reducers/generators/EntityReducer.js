import { Map } from 'immutable';

export const onFetch = ( state, action ) => {
    let data = Map();
    action.payload.data.forEach( item => {
        data = data.set( item.id, item );
    });

    return {...state, data };
}

export const onCreation = ( state, action ) => {
    let data = state.data.set( action.payload.data.id, action.payload.data );
    return {...state, data };
}

export const onUpdate = ( state, action ) => {
    let data = state.data.set( action.payload.data.id, action.payload.data );
    return {...state, data };
}

export const onDelete = ( state, action ) => {
    let data = state.data.delete( action.payload.data.deleted_id );
    return {...state, data };
}

const builder = ( entity, validActions ) => {
    const prefix = entity.toUpperCase();
    let validTypes = {};
    validTypes[ prefix + '_' + 'FETCH_FULFILLED' ]  = onFetch;
    validTypes[ prefix + '_' + 'CREATE_FULFILLED' ] = onCreation;
    validTypes[ prefix + '_' + 'UPDATE_FULFILLED' ] = onUpdate;
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
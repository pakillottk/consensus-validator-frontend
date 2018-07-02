import { Map } from 'immutable';

export const onFetch = ( preprocessor, postprocessor ) => ( state, action ) => {
    let data = Map();
    //if iterable
    let newState = {...state};
    if( action.payload.data.forEach ) {
        action.payload.data.forEach( item => {
            data = data.set( item.id, preprocessor( item ) );
        });
        
        newState.data = data

        if( postprocessor ) {
            newState = postprocessor( 'fetch', newState, state, action, action.payload.data )
        }
    } else {
        console.log( action )
    }

    return newState;
}

export const onSingleFetch = ( preprocessor, postprocessor ) => ( state, action ) => {
    let data = state.data;
    const item = preprocessor( action.payload.data );

    let newState = {...state, data: data.set( item.id, item ) };
    if( postprocessor ) {
        newState = postprocessor( 'fetch_single', newState, state, action, item )
    }

    return newState;
}

export const onCreation = ( preprocessor, postprocessor ) => ( state, action ) => {
    const item = action.payload.data;
    let data;
    let newState = {...state};
    if( action.payload.data.array ) {
        const items = JSON.parse( action.payload.data.array );
        for( let i = 0; i < items.length; i++ ) {
            data = newState.data.set( items[i].id, preprocessor( items[i] ) );
            newState = {...newState, data };
            if( postprocessor ) {
                newState = postprocessor( 'create', newState, state, action, items[i] );
            }
        }
    } else {
        data = state.data.set( item.id, preprocessor( item ) );
        newState = {...newState, data };
        if( postprocessor ) {
            newState = postprocessor( 'create', newState, state, action, item )
        }
    }   

    return newState;
}

export const onUpdate = ( preprocessor, postprocessor ) => ( state, action ) => {
    const item = action.payload.data;
    let data = state.data.set( item.id, preprocessor( item ) );

    let newState = {...state, data };
    if( postprocessor ) {
        newState = postprocessor( 'update', newState, state, action, item )
    }

    return newState;
}

export const onDelete = ( preprocessor, postprocessor ) => ( state, action ) => {
    let data = state.data.delete( parseInt(action.meta.deleted_id, 10) );
    let newState = {...state, data };
    if( postprocessor ) {
        newState = postprocessor( 'delete', newState, state, action )
    }

    return newState
}

export const onBulkDelete = ( state, action ) => {
    const ids = action.meta.deleted_ids;
    let data = state.data;
    for( let i = 0; i < ids.length; i++ ) {
        data = data.delete( parseInt(ids[i], 10) );        
    }
    return {...state, data};
}

export const flushData = ( state, action ) => {
    return {...state, data: Map()};
}

const builder = ( entity, validActions, preprocessor, postprocessor ) => {
    preprocessor = preprocessor || ( ( item ) => { return item; } );
    const prefix = entity.toUpperCase();
    let validTypes = {};
    validTypes[ prefix + '_FETCH_FULFILLED' ]          = onFetch( preprocessor, postprocessor );
    validTypes[ prefix + '_SINGLE_FETCH_FULFILLED' ]   = onSingleFetch( preprocessor, postprocessor )
    validTypes[ prefix + '_CREATE_FULFILLED' ]         = onCreation( preprocessor, postprocessor );
    validTypes[ prefix + '_UPDATE_FULFILLED' ]         = onUpdate( preprocessor, postprocessor );
    validTypes[ prefix + '_DELETE_FULFILLED' ]         = onDelete( preprocessor, postprocessor );
    validTypes[ prefix + '_BULK_DELETE_FULFILLED' ]    = onBulkDelete;
    validTypes[ prefix + '_FLUSH' ]                    = flushData;
    validTypes[ 'LOGOUT' ]                             = flushData;

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
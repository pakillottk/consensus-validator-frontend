import { Map } from 'immutable'

export default ( state = { cache: Map() }, action ) => {
    switch( action.type ) {
        case 'STORE_CACHED_IMG': {
            return {...state, cache: state.cache.set( action.payload.key, action.payload.imgData )}
        }

        case 'FLUSH_IMG_CACHE': {
            return {...state, cache: Map()}
        }

        default: {
            return state
        }
    }
}
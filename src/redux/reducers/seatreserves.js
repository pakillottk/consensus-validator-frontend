import EntityReducer from './generators/EntityReducer';

const postprocessor = ( mode, newState, oldState, action, item ) => {
    if( mode === 'create' && action.meta ) {
        const toSelection = action.meta.toSelection
        toSelection.seatState.reserve_id = item.id
        return {...newState, toSelection}
    } else if ( mode === 'delete' && action.meta ) {
        return {...newState, toDeselect: action.meta.toDeselect}
    }

    return {...newState, toSelection: null, toDeselect: null}
}

export default EntityReducer( 'SeatReserves', {}, null, postprocessor );
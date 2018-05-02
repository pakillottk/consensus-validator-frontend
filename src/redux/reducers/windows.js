import Window from '../../components/ui/window/Window'
import { Map } from 'immutable'

export default ( state = { windows: Map() }, action ) => {
    switch( action.type ) {
        case 'ADD_WINDOW': {
            const window = new Window( action.payload.title, action.payload.content )
            return {...state, windows: state.windows.set( window.id, window )}
        }

        case 'UPDATE_WINDOW': {
            const window = state.windows.get( action.payload.id )
            if( !window ) {
                return state
            }
            const newWindow = window.update( action.payload.data )

            return {...state, windows: state.windows.set( newWindow.id, newWindow ) }
        }

        case 'REMOVE_WINDOW': {
            return {...state, windows: state.windows.remove( action.payload.id )}
        }

        default: {
            return state
        }
    }
}
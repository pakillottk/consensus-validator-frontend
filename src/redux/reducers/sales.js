import EntityReducer from './generators/EntityReducer'
import { Map } from 'immutable'

const preproccessor = ( sale ) => {
    if( sale.code ) {
        sale.type_id = sale.code.type_id;
    }
    if( sale.user ) {
        sale.username = sale.user.username;
    }

    return sale;
}

const postprocessor = ( mode, newState, oldState, action, item ) => {
    if( mode === "create" ) {
        const target = parseInt(action.meta.total)
        const received = newState.salesReceived + 1
        if( received === 1 ) {
            newState.toPrint = Map()
        }
        if( received === target ) {
            return {...newState, toPrint: newState.toPrint.set( item.id, item ), printRequest: true, salesReceived: 0}
        }

        return {...newState, toPrint: newState.toPrint.set( item.id, item ), printRequest: false, salesReceived: received}
    }

    return {...newState, salesReceived: 0, toPrint: Map(), printRequest: false}
}

const printTickets = ( state, action ) => {
    let toPrint = Map()
    action.payload.forEach( ticket => {
        toPrint = toPrint.set( ticket.id, ticket )
    })

    return {...state, toPrint: toPrint, printRequest: true}
}

export default EntityReducer( 'Sales', {'PRINT_TICKETS': printTickets}, preproccessor, postprocessor );
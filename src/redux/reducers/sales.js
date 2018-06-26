import EntityReducer from './generators/EntityReducer'
import { Map } from 'immutable'

const preproccessor = ( sale ) => {
    if( sale.code ) {
        sale.type_id = sale.code.type_id;
        if( sale.code.zone ) {
            sale.zone = sale.code.zone.zone;
        }
        sale.seat_row = sale.code.row_index;
        sale.seat_number = sale.code.seat_number;
    }
    if( sale.user ) {
        sale.username = sale.user.username;
    }

    return sale;
}

const postprocessor = ( mode, newState, oldState, action, item ) => {
    if( mode === "create" && action.meta ) {
        const target = parseInt(action.meta.total, 10)
        const received = newState.salesReceived + 1
        if( received === 1 ) {
            newState.toPrint = Map()
        }
        if( received === target && received > 0 ) {
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

    return {...state, toPrint: toPrint, printRequest: true, salesReceived: 0}
}

const endPrint = ( state, action ) => {
    return {...state, toPrint: Map(), printRequest: false, salesReceived: 0}
}

export default EntityReducer( 'Sales', {'PRINT_TICKETS': printTickets, 'PRINT_DONE': endPrint}, preproccessor, postprocessor );
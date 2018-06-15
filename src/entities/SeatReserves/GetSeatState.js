import moment from 'moment'

export default function( seatreserves, zoneId, row, seatIndex, meId=null ) {
    let reserve = null
    seatreserves.filter( seatreserve => parseInt( seatreserve.zone_id, 10 ) === zoneId ).some( seatreserve => {
        //Check if seat it's on the correct row
        if( parseInt( seatreserve.seat_row, 10 ) === row ) {
            //Check if seat it's on the correct column
            if( parseInt( seatreserve.seat_index, 10 ) === seatIndex ) {
                reserve = seatreserve
                return true
            }
        }
    })
    if( reserve ){
        if( !reserve.expires_at || moment(reserve.expires_at).isBefore( moment() ) ) {
            if( reserve.user_id === null || reserve.user_id === meId ) {
                return {state: 'BLOQUEADO', color:'rgb(255,150,150)'}    
            }
            return {state: 'OCUPADO', color:'rgb(255,150,150)'}
        } 
    }
    
    return { state:'LIBRE', color:'lightgreen' }
}
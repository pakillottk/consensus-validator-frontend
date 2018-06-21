import moment from 'moment'

export default function( seatreserves, zoneId, row, seatIndex, meId=null ) {
    let reserve = null
    seatreserves.filter( seatreserve => parseInt( seatreserve.zone_id, 10 ) === zoneId ).forEach( seatreserve => {
        if( seatreserve.expires_at && moment().isAfter( moment( seatreserve.expires_at ) ) ) {
            return;
        }
        //Check if seat it's on the correct row
        if( parseInt( seatreserve.seat_row, 10 ) === row ) {
            //Check if seat it's on the correct column
            if( parseInt( seatreserve.seat_index, 10 ) === seatIndex ) {
                reserve = seatreserve
            }
        }
    })

    if( reserve ) {
        if( !reserve.expires_at || moment().isBefore( moment( reserve.expires_at ) ) ) {
            if( reserve.user_id === null || parseInt(reserve.user_id,10) !== parseInt(meId,10) ) {
                return {reserve_id: reserve.id, state: 'BLOQUEADO', color:'rgb(255,150,150)', reservedBy: reserve.user_id}    
            } else if( parseInt(reserve.user_id,10) === parseInt(meId,10) ) {
                return {reserve_id: reserve.id, state: 'RESERVADO', color:'yellow', reservedBy: reserve.user_id}
            }
            return {reserve_id: reserve.id, state: 'OCUPADO', color:'rgb(255,150,150)', reservedBy: reserve.user_id}
        } 
    }
    
    return { state:'LIBRE', color:'lightgreen' }
}
/*
    Get price for the seat at row ( 1-based ) and
    with seatIndex (1-based).

    Returns it's TicketType
*/
export default function( zoneId, seatprices, row, seatIndex ) {
    let type = null
    seatprices.filter( seatprice => seatprice.zone_id === zoneId && seatprice.numerated ).some( seatprice => {
        //Check if seat it's on the correct row
        if( seatprice.from_row <= row && seatprice.to_row >= row ) {
            //Check if seat it's on the correct column
            if( seatprice.from_seat <= seatIndex && seatprice.to_seat >= seatIndex ) {
                type = seatprice.type
                return true
            }
        }
    })

    return type
}
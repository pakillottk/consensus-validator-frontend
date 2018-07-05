/*
    Get prices for the seat at row ( 1-based ) and
    with seatIndex (1-based).

    Returns it's TicketTypes
*/
export default function( zoneId, seatprices, row, seatIndex ) {
    const types = []
    seatprices.filter( seatprice => seatprice.zone_id === zoneId && seatprice.numerated ).forEach( seatprice => {
        //Check if seat it's on the correct row
        if( seatprice.from_row <= row && seatprice.to_row >= row ) {
            //Check if seat it's on the correct column
            if 
            ( 
                row < seatprice.to_row || 
                (
                    seatprice.to_row === row && 
                    seatprice.to_seat >= seatIndex && 
                    seatprice.from_seat <= seatIndex 
                ) 
            ) {
                types.push( seatprice.type )
            }
        }
    })

    return types
}
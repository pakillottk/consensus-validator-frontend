export default function( seatrows, sales ) {
    const zoneTables = {};
    seatrows.forEach( seatrow => {
        if( zoneTables[ seatrow.zone_id ] === undefined ) {
            zoneTables[ seatrow.zone_id ] = [[]];
        }
        while( zoneTables[ seatrow.zone_id ].length < seatrow.row_index+1 ) {
            zoneTables[ seatrow.zone_id ].push( [] );
        }
        while( zoneTables[ seatrow.zone_id ][ seatrow.row_index ].length < seatrow.seats ) {
            zoneTables[ seatrow.zone_id ][ seatrow.row_index ].push( null );
        }
        
        //mark each sold seat
        const rowSales = sales.filter( sale => sale.code.zone_id === seatrow.zone_id && sale.code.row_index === (seatrow.row_index+1) )
        rowSales.forEach( sale => {
            zoneTables[ seatrow.zone_id ][ seatrow.row_index ][ sale.code.seat_index -1 ] = sale;
        });
    });

    return zoneTables;
}
export default function( seatrows, seatprices ) {
    const zoneTables = {};
    seatrows.forEach( seatrow => {
        if( zoneTables[ seatrow.zone_id ] === undefined ) {
            zoneTables[ seatrow.zone_id ] = [[]];
        }
        while( zoneTables[ seatrow.zone_id ].length < seatrow.row_index+1 ) {
            zoneTables[ seatrow.zone_id ].push( [] );
        }
        while( zoneTables[ seatrow.zone_id ][ seatrow.row_index ].length < seatrow.seats ) {
            zoneTables[ seatrow.zone_id ][ seatrow.row_index ].push( [] );
        }
        
        //add each price to the right seat
        const rowPrices = seatprices.filter( price => price.zone_id === seatrow.zone_id && price.from_row <= (seatrow.row_index+1) && price.to_row >= (seatrow.row_index+1) )
        rowPrices.forEach( seatprice => {
            const rowIndex = seatrow.row_index + 1;
            let from_seat = 0;
            let to_seat = 0;
            if( seatprice.from_row !== rowIndex && seatprice.to_row !== rowIndex ) {
                //middle row, include all seats
                from_seat = 0;
                to_seat = seatrow.seats - 1;
            } else {
                if( seatprice.from_row === seatprice.to_row ) {
                    //one row only
                    from_seat = seatprice.from_seat - 1;
                    to_seat = seatprice.to_seat - 1;  
                } else if( seatprice.from_row === rowIndex ) {
                    //This is the first row 
                    from_seat = seatprice.from_seat - 1;
                    to_seat = seatrow.seats - 1;            
                } else if( seatprice.to_row === rowIndex ) {
                    //This is the last row
                    from_seat = 0;
                    to_seat = seatprice.to_seat - 1;      
                } 
            }

            for( let i = from_seat; i <= to_seat; i++ ) {
                zoneTables[ seatrow.zone_id ][ seatrow.row_index ][ i ].push( seatprice );
            }
        });
    });

    return zoneTables;
}
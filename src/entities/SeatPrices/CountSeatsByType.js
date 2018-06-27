/*
    returns ammount of seats that are selling with the given typeId 
*/ 
export default function( seatrows, seatprices, typeId ) {
    const typePrices = seatprices.filter( price => price.type_id === typeId );
    //for each seatrow, check the seatprices included and ammount of seats
    let ammount = 0;
    seatrows.forEach( seatrow => {
        typePrices.forEach( seatprice => {
            //seatrow included in price
            if( 
                seatprice.zone_id === seatrow.zone_id && 
                seatprice.from_row <= (seatrow.row_index+1) &&
                seatprice.to_row >= (seatrow.row_index+1)                
            ) {
                const rowIndex = seatrow.row_index + 1;
                if( seatprice.from_row !== rowIndex && seatprice.to_row !== rowIndex ) {
                    //middle row, include all seats
                    ammount += seatrow.seats;
                } else {
                    if( seatprice.from_row === seatprice.to_row ) {
                        //one row only
                        ammount += seatprice.to_seat - seatprice.from_seat + 1;  
                    } else if( seatprice.from_row === rowIndex ) {
                        //if this is the first row   
                        //substract the from_seat
                        ammount += seatrow.seats - seatprice.from_seat - 1;    
                    } else if( seatprice.to_row === rowIndex ) {
                        //if this is the last row                        
                        //substract the seats not taken
                        ammount += seatrow.seats - (seatrow.seats - seatprice.to_seat);
                    }                   
                }                
            }
        })
    });

    return ammount;
}
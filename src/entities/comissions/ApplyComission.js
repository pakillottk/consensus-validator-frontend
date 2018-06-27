export default ( type, comission ) => {
    if( !comission ) {
        return type ? type.price : 0
    }
    
    const priceWithDC = type.price + ( type.price * comission.distribution_cost * 0.01 )
    if( comission.apply_on === 'total' ) {
        return priceWithDC + ( type.price * comission.comission * 0.01 )
    }

    return priceWithDC
}
export default ( type, comission ) => {
    if( !comission ) {
        return 0
    }
    if( comission.apply_on === 'base' ) {
        return type.price * comission.comission * 0.01
    }

    const priceWithCost = type.price + ( type.price * comission.distribution_cost * 0.01 )
    return priceWithCost * comission.comission * 0.01
}
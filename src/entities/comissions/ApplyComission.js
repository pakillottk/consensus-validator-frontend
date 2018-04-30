export default ( type, comission ) => {
    if( !comission ) {
        return type.price
    }
    
    return type.price + ( type.price * comission.distribution_cost * 0.01 )
}
export default ( type, comission ) => {
    if( !comission ) {
        return type ? type.price : 0
    }
    
    return type.price + ( type.price * comission.distribution_cost * 0.01 )
}
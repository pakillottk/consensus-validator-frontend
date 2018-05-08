export default ( type, comission ) => {
    if( !comission ) {
        return 0
    }
    
    return ( type.price * comission.distribution_cost * 0.01 )
}
export default ( type, comission ) => {
    if( !comission ) {
        return 0
    }

    return type.price * comission.comission * 0.01
}
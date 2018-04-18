export default ( role ) => {
    switch( role ) {
        case 'admin': {
            return 'administrador'
        }
        case 'seller': {
            return 'vendedor'
        }

        case 'scanner': {
            return 'escáner'
        }

        default:{
            return role
        }
    }
}
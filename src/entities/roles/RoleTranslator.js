export default ( role ) => {
    switch( role ) {
        case 'admin': {
            return 'administrador'
        }
        case 'seller': {
            return 'vendedor'
        }

        case 'ticketoffice-manager': {
            return 'taquillero'
        }

        case 'scanner': {
            return 'escáner'
        }

        default:{
            return role
        }
    }
}
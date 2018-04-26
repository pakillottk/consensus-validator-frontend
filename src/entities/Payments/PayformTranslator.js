export default ( payform ) => {
    switch( payform ) {
        case 'cash': {
            return 'A/CTA'
        }
        case 'transfer': {
            return 'TRANSFERENCIA'
        }
        case 'check': {
            return 'CHEQUE'
        }
        default: {
            return payform
        }
    }
}
export default ( payOn ) => {
    switch( payOn ) {
        case 'base': {
            return 'EN BASE'
        }
        case 'total': {
            return 'EN BASE + G.D.'
        }
        default: {
            return payOn
        }
    }
}
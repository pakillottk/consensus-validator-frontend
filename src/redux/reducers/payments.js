import EntityReducer from './generators/EntityReducer';

const preproccessor = ( payment ) => {
    if( payment.user ) {
        payment.username = payment.user.username;
    }

    return payment;
}

export default EntityReducer( 'Payments', {}, preproccessor );
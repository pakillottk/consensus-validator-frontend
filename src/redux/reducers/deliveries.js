import EntityReducer from './generators/EntityReducer';
import moment from 'moment'

const preprocess = ( delivery ) => {
    if( delivery.user ) {
        delete delivery.user.password
        delivery.username = delivery.user.username
    }
    if( delivery.type ) {
        delivery.typeText = delivery.type.type + ' ' + delivery.type.price + '€'
    }
    delivery.created_at = moment( delivery.created_at ).format( 'DD/MM/YYYY HH:mm' );

    return delivery
}
export default EntityReducer( 'Deliveries', {}, preprocess );
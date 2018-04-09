import EntityReducer from './generators/EntityReducer';
import moment from 'moment'

const preprocess = ( entry ) => {
    if( entry.user ) {
        delete entry.user.password
        entry.username = entry.user.username
    }
    if( entry.date ) {
        entry.date = moment( entry.date ).format( 'HH:mm DD/MM/YYYY' );
    }

    return entry
}
export default EntityReducer( 'LogEntries', {}, preprocess );
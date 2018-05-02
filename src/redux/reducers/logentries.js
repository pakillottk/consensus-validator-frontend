import EntityReducer from './generators/EntityReducer';

const preprocess = ( entry ) => {
    if( entry.user ) {
        delete entry.user.password
        entry.username = entry.user.username
    }
    
    return entry
}
export default EntityReducer( 'LogEntries', {}, preprocess );
import EntityReducer from './generators/EntityReducer'

const preproccessor = ( group ) => {
    if( group.user ) {
        group.username = group.user.username;
    }
    if( group.group ) {
        group.groupname = group.group[0].group;
    }

    return group;
}

export default EntityReducer( 'UserScanGroups', {}, preproccessor );
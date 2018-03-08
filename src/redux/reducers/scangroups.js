import EntityReducer from './generators/EntityReducer'

const preproccessor = ( group ) => {
    if( group.session ) {
        group.session = group.session.name;
    }

    return group;
}

export default EntityReducer( 'ScanGroups', {}, preproccessor );
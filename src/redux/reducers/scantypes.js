import EntityReducer from './generators/EntityReducer'

const preproccessor = ( scantype ) => {
    if( scantype.group ) {
        scantype.group = scantype.group.group;
    }
    if( scantype.type ) {
        scantype.type = scantype.type.type;
    }

    return scantype;
}

export default EntityReducer( 'ScanTypes', {}, preproccessor );
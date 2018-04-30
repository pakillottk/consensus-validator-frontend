import EntityReducer from './generators/EntityReducer';

const preproccessor = ( comission ) => {
    if( comission.user ) {
        comission.username = comission.user.username;
    }

    return comission;
}

export default EntityReducer( 'Comissions', {}, preproccessor );
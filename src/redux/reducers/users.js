import EntityReducer from './generators/EntityReducer'

const preprocess = ( user ) => {
    user.password = ''
    user.role = user.role.role
    if( user.company ) {
        user.company = user.company.name
    }

    return user
}

export default EntityReducer( 'Users', {}, preprocess )
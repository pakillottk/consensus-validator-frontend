import EntityReducer from './generators/EntityReducer'

const preprocess = ( user ) => {
    user.password = ''
    user.role = user.role.role

    return user
}

export default EntityReducer( 'Users', {}, preprocess )
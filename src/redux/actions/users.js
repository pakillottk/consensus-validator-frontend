import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'users', API, {
    fetch: '/users',
    create: '/users',
    update: '/users',
    delete: '/users'
});
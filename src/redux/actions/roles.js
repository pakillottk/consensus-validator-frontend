import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'roles', API, {
    fetch: '/roles',
    create: '/roles',
    update: '/roles',
    delete: '/roles'
});
import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'userscangroups', API, {
    fetch: '/userscangroups',
    create: '/userscangroups',
    update: '/userscangroups',
    delete: '/userscangroups'
});
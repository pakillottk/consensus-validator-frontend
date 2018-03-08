import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'scangroups', API, {
    fetch: '/scangroups',
    create: '/scangroups',
    update: '/scangroups',
    delete: '/scangroups'
});
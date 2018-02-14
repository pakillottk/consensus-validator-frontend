import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'companies', API, {
    fetch: '/companies',
    create: '/companies',
    update: '/companies',
    delete: '/companies'
});
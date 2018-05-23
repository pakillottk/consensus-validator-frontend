import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'codes', API, {
    fetch: '/codes',
    create: '/codes',
    update: '/codes',
    delete: '/codes',
    bulkDelete:'/codes/bulkDelete'
});
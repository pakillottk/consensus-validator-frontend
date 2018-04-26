import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'payments', API, {
    fetch: '/payments',
    create: '/payments',
    update: '/payments',
    delete: '/payments'
});
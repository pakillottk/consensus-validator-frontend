import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'comissions', API, {
    fetch: '/comissions',
    create: '/comissions',
    update: '/comissions',
    delete: '/comissions'
});
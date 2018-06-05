import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'recints', API, {
    fetch: '/recints',
    create: '/recints',
    update: '/recints',
    delete: '/recints'
});
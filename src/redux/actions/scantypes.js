import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'scantypes', API, {
    fetch: '/scantypes',
    create: '/scantypes',
    update: '/scantypes',
    delete: '/scantypes'
});
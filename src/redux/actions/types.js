import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'types', API, {
    fetch: '/types',
    create: '/types',
    update: '/types',
    delete: '/types'
});
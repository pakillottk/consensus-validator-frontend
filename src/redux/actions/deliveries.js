import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'deliveries', API, {
    fetch: '/deliveries',
    create: '/deliveries',
    update: '/deliveries',
    delete: '/deliveries'
});
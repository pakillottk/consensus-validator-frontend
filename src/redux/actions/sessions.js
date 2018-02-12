import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'sessions', API, {
    fetch: '/sessions',
    create: '/sessions',
    update: '/sessions',
    delete: '/sessions'
});
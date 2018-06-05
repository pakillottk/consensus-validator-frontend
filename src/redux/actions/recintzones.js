import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'recintzones', API, {
    fetch: '/recintzones',
    create: '/recintzones',
    update: '/recintzones',
    delete: '/recintzones'
});
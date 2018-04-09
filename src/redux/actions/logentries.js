import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'logentries', API, {
    fetch: '/logentries',
    create: '/logentries',
    update: '/logentries',
    delete: '/logentries'
});
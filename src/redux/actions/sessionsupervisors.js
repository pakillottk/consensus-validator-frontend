import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'sessionsupervisors', API, {
    fetch: '/sessionsupervisors',
    create: '/sessionsupervisors',
    update: '/sessionsupervisors',
    delete: '/sessionsupervisors'
});
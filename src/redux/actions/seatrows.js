import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'seatrows', API, {
    fetch: '/seatrows',
    create: '/seatrows',
    update: '/seatrows',
    delete: '/seatrows'
});
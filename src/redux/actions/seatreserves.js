import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'seatreserves', API, {
    fetch: '/seatreserves',
    create: '/seatreserves',
    update: '/seatreserves',
    delete: '/seatreserves'
});
import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'seatprices', API, {
    fetch: '/seatprices',
    create: '/seatprices',
    update: '/seatprices',
    delete: '/seatprices'
});
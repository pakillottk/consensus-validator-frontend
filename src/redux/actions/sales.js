import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'sales', API, {
    fetch: '/sales',
    create: '/sales',
    update: '/sales',
    delete: '/sales'
});

export const print = ( tickets ) => {
    return {
        type: 'PRINT_TICKETS',
        payload: tickets
    }
}

export const endPrint = () => {
    return {
        type: 'PRINT_DONE',
        payload: {}
    }
}
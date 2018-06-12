import EntityActions from './generators/EntityActions';
import API from '../../API/API';

export const crud = EntityActions( 'zonepolygons', API, {
    fetch: '/zonepolygons',
    create: '/zonepolygons',
    update: '/zonepolygons',
    delete: '/zonepolygons'
});
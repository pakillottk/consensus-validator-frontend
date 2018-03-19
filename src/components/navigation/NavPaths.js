import { Super, Admin, Any } from '../auth/authLevels'
const paths = [
    { path: '/companias', label: 'COMPAÑÍAS', Auth: Super },
    { path: '/usuarios', label: 'USUARIOS', Auth: Admin },
    { path: '/sesiones', label: 'SESIONES', Auth: Any }
];

export default paths
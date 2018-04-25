import { Super, Admin, Supervisor, Seller, Any } from '../auth/authLevels'
const paths = [
    { path: '/companias', label: 'COMPAÑÍAS', Auth: Super },
    { path: '/usuarios', label: 'USUARIOS', Auth: Admin },
    { path: '/sesiones', label: 'SESIONES', Auth: Any },
    { path: '/resumen', label: 'RESUMEN VENTAS', Auth: Seller }
];

export default paths
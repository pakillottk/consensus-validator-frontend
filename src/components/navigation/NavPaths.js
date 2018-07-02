import { Super, Seller, Any } from '../auth/authLevels'
const paths = [
    { path: '/companias', label: 'COMPAÑÍAS', Auth: Super },
    { path: '/recintos', label: 'RECINTOS', Auth: Super },
    { path: '/usuarios', label: 'USUARIOS', Auth: Super },
    { path: '/sesiones', label: 'SESIONES', Auth: Any },
    { path: '/resumen', label: 'RESUMEN VENTAS', Auth: Seller }
];

export default paths
import React from 'react'
import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'
import RoleSelector from '../../forms/Controls/RoleSelector/RoleSelector'
import RoleTranslator from '../../../entities/roles/RoleTranslator'

const schema = [
    {
        name: 'username',
        label: 'USUARIO',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'password',
        label: 'CONTRASEÑA',
        defaultValue: '',
        type: 'input',
        component: 'password'
    },
    {
        name: 'role_id',
        label: 'ROL',
        defaultValue: 0,
        tooltip: (
            <div>
                <p>El rol definirá los permisos:</p>
                <p><b>Administrador</b> - Acceso total</p>
                <p><b>Supervisor</b> - Puede comprobar las ventas, utilizar la taquilla y acceder al monitor de las
                sesiones (toda la información, en tiempo real).</p>
                <p><b>Taquillero</b> - Puede utilizar la taquilla, hasta la fecha de cierre de taquilla. Solo verá sus propias ventas.</p>
                <p><b>Vendedor</b> - Puede utilizar la taquilla, hasta la fecha de fin de cierre de puntos de venta. Solo verá sus propias ventas.</p>
                <p><b>Escáner</b> - Solo tendrá acceso a través de la APP móvil de escaneo.</p>
            </div>
        ),
        type: 'custom',
        component: RoleSelector
    },
    {
        name: 'company_id',
        label: 'COMPAÑÍA',
        defaultValue: 0,
        type: 'custom',
        component: CompanySelector
    },
    {
        name: 'role',
        label: 'ROL',
        type: 'input',
        displayFormat: ( role ) => {
            return RoleTranslator( role )
        }
    },
    {
        name: 'company',
        label: 'COMPAÑÍA',
        type: 'input'
    }
]
export default schema
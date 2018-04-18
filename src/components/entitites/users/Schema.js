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
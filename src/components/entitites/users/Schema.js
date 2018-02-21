import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'

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
        type: 'input'
    },
    {
        name: 'role_id',
        label: 'ROL',
        defaultValue: 1,
        type: 'input'
    },
    {
        name: 'company_id',
        label: 'COMPAÑÍA',
        defaultValue: 1,
        type: 'custom',
        component: CompanySelector
    },
    {
        name: 'role',
        label: 'ROL',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'company',
        label: 'COMPAÑÍA',
        defaultValue: '',
        type: 'input'
    }
]
export default schema
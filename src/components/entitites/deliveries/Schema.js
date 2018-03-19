import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'

const schema = [
    {
        name: 'user_id',
        label: 'USUARIO',
        defaultValue: 0,
        type: 'custom',
        component: UserSelector
    },
    {
        name: 'username',
        label: 'USUARIO',
        type: 'input',
    },
    {
        name: 'ammount',
        label: 'CANTIDAD',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'type_id',
        label: 'TIPO',
        defaultValue: 0,
        type: 'custom',
        component: TypeSelector
    },
    {
        name: 'typeText',
        label: 'TIPO',
        type: 'input',
    },
    {
        name: 'created_at',
        label: 'ENTREGADO',
        type: 'input'
    }

]
export default schema
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import ScanGroupSelector from '../../forms/Controls/ScanGroupSelector/ScanGroupSelector'

const schema = [
    {
        name: 'groupname',
        label: 'GRUPO',
        type: 'input',
    },
    {
        name: 'username',
        label: 'USUARIO',
        type: 'input',
    },
    {
        name: 'group_id',
        label: 'GRUPO',
        defaultValue: 0,
        type: 'custom',
        component: ScanGroupSelector
    },
    {
        name: 'user_id',
        label: 'USUARIO',
        defaultValue: 0,
        type: 'custom',
        component: UserSelector
    },    
]
export default schema
import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'

const schema = [
    {
        name: 'group',
        label: 'GRUPO',
        type: 'input',
    },
    {
        name: 'type',
        label: 'TIPO',
        type: 'input',
    },
    {
        name: 'group_id',
        label: 'GRUPO',
        type: 'input',
    },
    {
        name: 'type_id',
        label: 'TIPO',
        defaultValue: 0,
        type: 'custom',
        component: TypeSelector
    },    
]
export default schema
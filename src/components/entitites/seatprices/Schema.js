import RecintZoneSelector from '../../forms/Controls/RecintZoneSelector/RecintZoneSelector'
import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'

const schema = [
    {
        name: 'zone_id',
        label: 'ZONA',
        defaultValue: 0,
        type: 'custom',
        component: RecintZoneSelector
    },
    {
        name: 'type_id',
        label: 'TIPO',
        defaultValue: 0,
        type: 'custom',
        component: TypeSelector
    },
    {
        name: 'numerated',
        label: '¿NUMERADO?',
        type: 'input',
        defaultValue: false,
        component: 'checkbox'
    },
    {
        name: 'from_row',
        label: 'DESDE FILA',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'from_seat',
        label: 'DESDE ASIENTO',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'to_row',
        label: 'HASTA FILA',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'to_seat',
        label: 'HASTA ASIENTO',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'session_id',
        label: '',
        type: 'input',
        component: 'hidden'
    }
];
export default schema;
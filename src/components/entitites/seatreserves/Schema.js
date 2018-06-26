import React from 'react'
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'

const schema = [
    {
        name: 'user_id',
        label:'RESERVADO A',
        defaultValue: 0,
        type: 'custom',
        component: UserSelector
    },
    {
        name: 'zone',
        label: 'ZONA',
        type: 'input',
        component: 'hidden',
        displayFormat: ( zone ) => {
            return <p style={{color: zone.color}}>{zone.zone}</p>
        }
    },
    {
        name: 'user',
        label:'RESERVADO A',
        defaultValue: 0,
        type: 'input',
        component: 'hidden',
        displayFormat: ( user ) => {
            return user ? user.username : 'SIN ASIGNAR'
        }
    },
    {
        name:'seat_row',
        label:'FILA',
        type:'input',
        component:'hidden'
    },
    {
        name:'seat_index',
        label:'ASIENTO',
        type:'input',
        component:'hidden'
    },
];
export default schema;
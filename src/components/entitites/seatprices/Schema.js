import React from 'react'
import RecintZoneSelector from '../../forms/Controls/RecintZoneSelector/RecintZoneSelector'
import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'
import YesNoSelector from '../../forms/Controls/YesNoSelector/YesNoSelector'

const schema = [
    {
        name: 'zone_id',
        label: 'ZONA',
        defaultValue: 0,
        type: 'custom',
        component: RecintZoneSelector
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
        name: 'type_id',
        label: 'TIPO',
        defaultValue: 0,
        type: 'custom',
        component: TypeSelector
    },
    {
        name: 'type',
        label: 'TIPO',
        type:'input',
        component:'hidden',
        displayFormat: ( type ) => {
            return type.type + ` (${type.price}€)`
        }
    },
    {
        name: 'numerated',
        label: 'NUMERADO',
        defaultValue: 'false',
        type: 'custom',
        component: YesNoSelector,
        displayFormat: ( numerated ) => {
            return numerated ? 'SÍ': 'NO'
        },
        tooltip: (
            <div>
                <p>
                    Si elige no numerar, los campos: DESDE FILA, DESDE ASIENTO, HASTA FILA, HASTA ASIENTO
                    serán ignorados. Las entradas se limitarán a las cantidades definidas en las entregas
                    del tipo elegido.
                </p>
            </div> 
        )
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
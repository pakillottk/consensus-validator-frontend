import React from 'react'
import moment from 'moment'

import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'
import OutSelector from './OutSelector'

const schema = [
    {
        name: 'code',
        label: 'CÓDIGO',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'type_id',
        label: "TIPO",
        defaultValue: 0,
        type: 'custom',
        component: TypeSelector
    },
    {
        name: 'type',
        label: 'TIPO',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'name',
        label: 'NOMBRE',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'email',
        label: 'EMAIL',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'maxValidations',
        label: 'VALIDACIONES PERMITIDAS',
        defaultValue: 1,
        type: 'input',
        component: 'number',
        displayFormat: ( maxValidations ) => {
            if( parseInt(maxValidations, 10) === -1 ) {
                return "DESACTIVADO"
            }
            return maxValidations
        },
        tooltip: (
            <div>
                <p>Valores especiales:</p>
                <p><b>-1</b> - No escaneable. Nunca es válido.</p>
                <p><b>0</b> - Escaneos ilimitados. Siempre es válido.</p>
            </div>
        )
    },
    {
        name: 'validations',
        label: 'VALIDACIONES',
        defaultValue: 0,
        type: 'input',
        component: 'number'
    },
    {
        name: 'out',
        label: 'FUERA/DENTRO',
        defaultValue: '0',
        type: 'custom',
        component: OutSelector,
        displayFormat: ( out ) => {
            if( out ) {
                return "FUERA"
            } else {
                return "DENTRO"
            }
        },
    },
    {
        name: 'updated_at',
        label: 'ULT.ACTUALIZACIÓN',
        defaultValue: '',
        type: 'input',
        component: 'datetime-local',
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    }
]
export default schema
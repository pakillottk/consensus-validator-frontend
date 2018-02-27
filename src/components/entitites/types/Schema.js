import React from 'react'
import Currency from 'react-currency-formatter'

const schema = [
    {
        name: 'type',
        label: 'TIPO',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'price',
        label: 'PRECIO',
        type: 'input',
        defaultValue: 0,
        component: 'number',
        displayFormat: ( price ) => {
            return(
                <Currency
                    quantity={ price }
                    currency='EUR'
                />
            )
        }
    },
    {
        name: 'ammount',
        label: 'CANTIDAD',
        type: 'input',
        defaultValue: 0,
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
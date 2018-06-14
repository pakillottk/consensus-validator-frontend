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
        component: 'number',
        tooltip:(
            <div>
                <p>
                    Este campo solo es relevante cuando use un flujo
                    de ventas por tipos o vaya a asignar este tipo de
                    entrada a una zona no numerada. En otro caso, será
                    ignorado.
                </p>
            </div>
        )
    },
    {
        name: 'session_id',
        label: '',
        type: 'input',
        component: 'hidden'
    }
];
export default schema;
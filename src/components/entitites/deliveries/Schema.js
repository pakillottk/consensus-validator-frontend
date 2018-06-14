import React from 'react'
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
        component: 'number',
        tooltip:(
            <div>
                <p>Este campo solo es relevante en dos casos:</p>
                <p>
                    - <b>Flujo de ventas por zonas + Zona no numerada: </b>
                    En este caso, los vendedores solo podrán vender la cantidad
                    que se les haya asignado a cada uno. Es igual que si vendiera
                    con un flujo de ventas por tipos.
                </p>
                <p>
                    - <b>Flujo de ventas por tipos: </b>
                    En este caso, los vendedores solo tienen acceso a las entradas que
                    tengan entregadas, tanto en tipo como cantidad.
                </p>
            </div>
        )
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
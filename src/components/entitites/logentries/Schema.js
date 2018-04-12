import React from 'react';
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import LevelSelector from './LevelSelector'

const schema = [
    {
        name: 'user_id',
        label: 'USUARIO',
        defaultValue: 0,
        type: 'custom',
        component: UserSelector
    },
    {
        name: 'level',
        label: 'RESULTADO',
        defaultValue: 0,        
        type: 'custom',
        component: LevelSelector,
        displayFormat: ( level ) => {
            let translation;
            let color;
            switch( level ) {
                case 'info': {
                    translation = 'INFO';
                    color = 'blue';
                    break;
                }
                case 'success': {
                    translation = "ÉXITO";
                    color = 'green';
                    break;
                }
                case 'error': {
                    translation = 'ERROR';
                    color = 'red';
                    break;
                }
            }

            return (
                <div style={{backgroundColor: color, color: '#ddd', padding: '2px'}}>
                    {translation}
                </div>
            );
        },
    },
    {
        name: 'username',
        label: 'INICIADO POR',
        type: 'input',
    },
    {
        name: 'msg',
        label: 'SUCESO',
        type: 'input',
    },
    {
        name: 'date',
        label: 'FECHA',
        type: 'input'
    }

]
export default schema
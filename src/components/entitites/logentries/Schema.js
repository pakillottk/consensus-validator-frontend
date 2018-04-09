import React from 'react';

const schema = [
    {
        name: 'user_id',
        label: 'USUARIO',
        defaultValue: 0,
        type: 'custom',
        component: null
    },
    {
        name: 'level',
        label: 'RESULTADO',
        defaultValue: 'info',
        type: 'input',
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
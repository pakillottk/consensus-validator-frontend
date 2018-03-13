import moment from 'moment'

const schema = [
    {
        name: 'code',
        label: 'CÓDIGO',
        defaultValue: '',
        type: 'input'
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
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'validations',
        label: 'VALIDACIONES',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'out',
        label: 'FUERA/DENTRO',
        defaultValue: '',
        type: 'input',
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
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
    }
]
export default schema
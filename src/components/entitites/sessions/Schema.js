import moment from 'moment'
import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'

const schema = [
    {
        name: 'name',
        label: 'NOMBRE',
        type:'input'
    },
    {
        name: 'location',
        label: 'LOCALIDAD',
        type:'input'
    },
    {
        name: 'recint',
        label: 'RECINTO',
        type:'input'
    },
    {
        name: 'date',
        label: 'FECHA',
        type:'input',
        component: 'datetime-local',
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    },
    {
        name: 'company_id',
        label: 'COMPAÑÍA',
        defaultValue: 0,
        type:'custom',
        component: CompanySelector
    }
]
export default schema
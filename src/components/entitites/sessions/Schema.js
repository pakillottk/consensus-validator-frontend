import moment from 'moment'
import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker' 

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
        type:'custom',
        component: DatePicker,
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
        inputFormat: ( date ) => {
            return moment( date )
        }
    },
    {
        name: 'sellers_locked_at',
        label: 'CERRAR PUNTOS DE VENTA',
        type:'custom',
        component: DatePicker,
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
        inputFormat: ( date ) => {
            return moment( date )
        }
    },
    {
        name: 'ticketoffice_closed_at',
        label: 'CERRAR TAQUILLA',
        type:'custom',
        component: DatePicker,
        displayFormat: ( date ) => {
            return moment( date ).format( 'DD/MM/YYYY HH:mm' )
        },
        inputFormat: ( date ) => {
            return moment( date )
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
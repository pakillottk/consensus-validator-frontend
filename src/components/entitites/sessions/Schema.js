import React from 'react'
import Img from '../../ui/img/Img'
import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker' 
import ImgUploader from '../../forms/Controls/ImgUploader/ImgUploader'
import RecintSelector from '../../forms/Controls/RecintSelector/RecintSelector'
import TicketingFlowSelector from '../../forms/Controls/TicketingFlowSelector/TicketingFlowSelector'

import API from '../../../API/API'
import moment from 'moment'

const schema = [
    {
        name: 'header_img',
        label: 'CABECERA',
        type: 'file',
        component: ImgUploader,
        displayFormat: ( headerPath ) => {
            if( !headerPath ) {
                return headerPath
            }
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(headerPath)} size={'small'} />
                </div>
            )
        },
        filePreview: ( headerPath ) => {
            if( !headerPath ) {
                return null
            }
            
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(headerPath)} size={'small'} />
                </div>
            )
        }
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
        name: 'name',
        label: 'NOMBRE',
        type:'autocomplete',
        props: {
            requestPath: '/sessions',
            displayFormatter: (item) => item.name,
            valueSelector: (item) => item.name
        }
    },
    {
        name: 'location',
        label: 'LOCALIDAD',
        type:'input',
        component:'hidden'
    },
    {
        name: 'recint',
        label: 'RECINTO',
        type:'input',
        component:'hidden'
    },
    {
        name: 'recint_id',
        label: 'RECINTO',
        type:'custom',
        component: RecintSelector
    },    
    {
        name:'ticketing_flow',
        label:'FLUJO DE VENTAS',
        type:'custom',
        component: TicketingFlowSelector,
        tooltip: (
            <div>
                <p>Define la forma de venta:</p>
                <p><b>Por tipos</b> - Genere los distintos precios y la cantidad de entradas de cada precio.
                Las entradas se reparten manualmente a cada punto de venta. La taquilla solo requiere seleccionar
                un tipo y cantidad (Se descuentan de las entregas realizadas)</p>
                <p><b>Por zonas</b> - Emplea las zonas definidas en el recinto para ajustar los precios a las localidades
                definidas en el mismo. La taquilla requiere seleccionar una localidad concreta o la zona en cuestión.
                Los distintos puntos de venta autorizados, comparten las mismas entradas. Se sincronizan en tiempo real.</p>
            </div>
        )
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
    },
    {
        name: 'logos_img',
        label: 'LOGOS',
        type: 'file',
        component: ImgUploader,
        displayFormat: ( logoPath ) => {
            if( !logoPath ) {
                return logoPath
            }
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(logoPath)} size={'small'} />
                </div>
            )
        },
        filePreview: ( logoPath ) => {
            if( !logoPath ) {
                return null
            }
            
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(logoPath)} size={'small'} />
                </div>
            )
        }
    }    
]
export default schema
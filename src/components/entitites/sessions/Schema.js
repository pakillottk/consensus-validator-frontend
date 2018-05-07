import React from 'react'
import Img from '../../ui/img/Img'
import CompanySelector from '../../forms/Controls/CompanySelector/CompanySelector'
import DatePicker from '../../forms/Controls/DatePicker/DatePicker' 
import ImgUploader from '../../forms/Controls/ImgUploader/ImgUploader'

import API from '../../../API/API'
import moment from 'moment'

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
                    <Img src={API.getFullPath(logoPath)} size={'tiny'} />
                </div>
            )
        },
        filePreview: ( logoPath ) => {
            if( !logoPath ) {
                return null
            }
            
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(logoPath)} size={'tiny'} />
                </div>
            )
        }
    },
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
                    <Img src={API.getFullPath(headerPath)} size={'tiny'} />
                </div>
            )
        },
        filePreview: ( headerPath ) => {
            if( !headerPath ) {
                return null
            }
            
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(headerPath)} size={'tiny'} />
                </div>
            )
        }
    }
]
export default schema
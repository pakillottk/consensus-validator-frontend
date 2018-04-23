import React from 'react'
import Img from '../../ui/img/Img'
import ImgUploader from '../../forms/Controls/ImgUploader/ImgUploader'
import API from '../../../API/API'

const schema = [
    {
        name: 'nif',
        label: 'NIF',
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
        name: 'address',
        label: 'DIRECCIÓN',
        defaultValue: '',
        type: 'input'
    },
    {
        name: 'phone',
        label: 'TELÉFONO',
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
        name: 'logo_url',
        label: 'LOGO',
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
    }
]
export default schema
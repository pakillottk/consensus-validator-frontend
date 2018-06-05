import React from 'react'
import API from '../../../API/API'
import ImgUploader from '../../forms/Controls/ImgUploader/ImgUploader'
import Img from '../../ui/img/Img'

const schema = [
    {
        name:'recint',
        label:'RECINTO',
        type:'input',
        component:'text'
    },
    {
        name:'location',
        label:'LOCALIDAD',
        type:'input',
        component:'text'
    },
    {
        name:'address',
        label:'DIRECCIÓN',
        type:'input',
        component:'text'
    },
    {
        name: 'recint_plane',
        label: 'PLANO',
        type: 'file',
        component: ImgUploader,
        displayFormat: ( planePath ) => {
            if( !planePath ) {
                return planePath
            }
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(planePath)} size={'tiny'} />
                </div>
            )
        },
        filePreview: ( planePath ) => {
            if( !planePath ) {
                return null
            }
            
            return(
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Img src={API.getFullPath(planePath)} size={'tiny'} />
                </div>
            )
        }
    }
]
export default schema
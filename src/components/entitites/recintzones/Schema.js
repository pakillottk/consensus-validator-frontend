import React from 'react'
import RecintSelector from '../../forms/Controls/RecintSelector/RecintSelector'

const schema = [
    {
        name:'zone',
        label:'ZONA',
        type:'input',
        component:'text'
    },
    {
        name:'recint_id',
        label:'RECINTO',
        defaultValue: 0,
        type:'custom',
        component: RecintSelector
    },
    {
        name:'color',
        label:'COLOR',
        type:'input',
        defaultValue:'#ff0000',
        component:'color',
        displayFormat: ( color ) => {
            return(
                <div style={{
                    width:'100%',
                    height:'20px',
                    background:color
                }}>
                </div>
            )
        }
    },
]
export default schema
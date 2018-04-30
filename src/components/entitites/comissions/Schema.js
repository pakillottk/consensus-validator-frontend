import React from 'react'
import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
import PayOnSelector from '../../forms/Controls/PayOnSelector/PayOnSelector'
import TranslatePayOn from '../../../entities/comissions/TranslatePayOn'
import Currency from 'react-currency-formatter'
import moment from 'moment'

const schema = [
    {
        name:'username',
        label:'VENDEDOR',
        type:'input'
    },
    {
        name:'user_id',
        label:'VENDEDOR',
        type:'custom',
        component: UserSelector
    },
    {
        name: 'distribution_cost',
        label: 'GASTOS DE DISTRIBUCIÓN',
        defaultValue: 0,
        type:'input',
        component:'number',
        displayFormat: ( cost ) => {
            return cost + '%'
        }
    },
   {
       name:'comission',
       label:'% COMISIÓN',
       defaultValue: 0,
       type:'input',
       component:'number',
       displayFormat: ( comis ) => {
           return comis + '%'
       }
   },
   {
        name:'apply_on',
        label:'APLICAR COMISIÓN',
        defaultValue: 0,
        type:'custom',
        component: PayOnSelector,
        displayFormat: ( pay ) => {
            return TranslatePayOn( pay )
        }
   },
   {
       name:'session_id',
       label:'SESIÓN',
       defaultValue: '',
       type:'input'
   }
]
export default schema
import React from 'react'
import PayFormSelector from '../../forms/Controls/PayFormSelector/PayFormSelector'
import PayFormTranslator from '../../../entities/Payments/PayformTranslator'
import Currency from 'react-currency-formatter'
import moment from 'moment'

const schema = [
    {
        name:'username',
        label:'REALIZADO POR',
        type:'input'
    },
    {
        name: 'ammount',
        label: 'CANTIDAD',
        defaultValue: 0,
        type:'input',
        component:'number',
        displayFormat: ( ammount ) => {
            return(
                <Currency
                    currency='EUR'
                    quantity={parseFloat(ammount)}
                />
            )
        }
    },
   {
       name:'pay_form',
       label:'FORMA DE PAGO',
       defaultValue: 0,
       type:'custom',
       component:PayFormSelector,
       displayFormat: ( payform ) => {
            return PayFormTranslator( payform )
       }
   },
   {
       name:'details',
       label:'DETALLES',
       type:'input',
       component:'text'
   },
   {
        name:'paid_to',
        label:'PAGADO A',
        type:'input',
        component:'text'
   },
   {
       name:'created_at',
       label:'FECHA DE PAGO',
       type:'input',
       displayFormat: ( date ) => {
        return moment( date ).format( 'DD/MM/YYYY HH:mm' )
       }
   }
]
export default schema
import React from 'react'

import API from '../../../API/API'
import Currency from 'react-currency-formatter';
import ApplyComission from '../../../entities/comissions/ApplyComission';
import moment from 'moment'

export default (ticketData, props) => {
    const { types, company, session, comissionsByUser } = props
    const type = types.get( ticketData.type_id )
    const sellPrice = ApplyComission( type, comissionsByUser[ ticketData.user_id ] )
    const basePrice = <Currency currency="EUR" quantity={type.price} />
    const gd = <Currency currency="EUR" quantity={sellPrice - type.price} />
    const price = <Currency currency='EUR' quantity={sellPrice} />

    // ticketData = {...ticketData, sessionDate: moment(ticketData.sessionDate)}

    return (
        <div key={ ticketData.id } style={{
            width:'6in',
            height:'2.25in',
            maxHeight:'2.25in',
            position:'relative',
            //top: '0.25in',
            margin: 0,
            pageBreakAfter:'always'
        }}> 
            {/*LOGO MARKER*/}
            <div style={{height:'2.54cm', width:'5.08cm'}}></div>
            {/*FOOTER MARKER*/}
            <div style={{position:'absolute', top:'5.08cm',left:0, width:'12.7cm', height:'1.27cm'}}></div>

            {/*QR Code*/}
            <div style={{position:'absolute', top:'0.75in', left:'0.5cm'}}>
                <div id={ ticketData.id } className="qrcode"></div>
            </div>

            {/*SALE DATA*/}
            <div style={{position:'absolute', padding:'0.2cm',top:'0.25in', left:'5.2cm', width:'7.1cm', height:'2.34cm'}}>
                <div style={{color:'black', fontSize:'9pt', textAlign:'center'}}>{ moment(ticketData.created_at).format( 'DD/MM/YYYY HH:mm' ) }</div>
                <div style={{color:'black', fontSize:'9pt', textAlign:'center'}}>{ ticketData.name } #{ ticketData.id }</div>                
            </div>

            {/*SESSION AND TYPE DATA*/}
            <div style={{position:'absolute', width:'9cm', height:'2.45cm', top:'0.75in', left:'2.7cm'}}>
                <div style={{color:'black', fontWeight:'bold', fontSize:'11pt', textAlign:'center'}}>{ session.name }</div>
                <div style={{color:'black', fontSize:'9pt', textAlign:'center'}}>
                    { moment(session.date).format( 'DD MMMM YYYY HH:mm' ) } H.
                </div>
                <div style={{color:'black', fontSize:'9pt', textAlign:'center'}}>{ session.recint } ({ session.location })</div>
                <div style={{color:'black', fontWeight:'bold', fontSize:'10pt', textAlign:'center'}}>{ ticketData.type }</div>
                <div style={{color:'black', fontSize:'10pt', textAlign:'center'}}>
                    { price } 
                    <span style={{fontSize:'7pt'}}> (Base: {basePrice} +  G.D.: {gd})</span> 
                </div>
            </div>

            {/*BARCODE*/}
            <div style={{position:'absolute', top:'0.15in', right:'0cm', width:'0.75cm', height:'6cm'}}>
                <div style={{transform:"translate(0.15in, 2.8cm) rotate(-90deg)"}}>
                    <svg id={ ticketData.id } width='1' height='50' className="barcode" />
                </div>
            </div>
        </div>
      )
}
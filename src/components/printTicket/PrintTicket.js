import React from 'react'

import { endPrint } from '../../redux/actions/sales';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import jsbarcode from 'jsbarcode';
import qrgenerator from 'qrcode-generator';

import moment from 'moment'
import Currency from 'react-currency-formatter';
import ApplyComission from '../../entities/comissions/ApplyComission';

class PrintTicket extends React.Component {
  componentDidUpdate() {
    if( this.props.print ) {
      const barcodes = document.getElementsByClassName("barcode");
      for( let i = 0; i < barcodes.length; i++ ) {
        const code = this.props.tickets.get( parseInt( barcodes[ i ].id, 10 ) ).code.code;        
        barcodes[ i ].setAttribute( "jsbarcode-format", "CODE128" );
        barcodes[ i ].setAttribute( "jsbarcode-value", code );
      }
      jsbarcode(".barcode").init();


      const qrcodes = document.getElementsByClassName("qrcode");
      for( let i = 0; i < qrcodes.length; i++ ) {
        const _code = this.props.tickets.get( parseInt( qrcodes[ i ].id, 10 ) ).code.code;
        const qr = qrgenerator( 4, 'L' );
        qr.addData(_code);
        qr.make();
        qrcodes[ i ].innerHTML = qr.createImgTag();
      }
      this.renderPdf( this.props.print );
    }
  }

  renderPdf( forcePrint ) {
    if( !this.props.company ) {
      return;
    }
    
    const wrapper = document.getElementById("tickets-wrapper");
    const printWindow = this.iframe;
    const printDocument = printWindow.contentDocument;
    printDocument.body.innerHTML = wrapper.innerHTML;
    if( forcePrint ) {
      const tid = setInterval( () => {
        if( printDocument.readyState === 'complete' ) {
          this.print();
          clearInterval( tid );
        }
      },100)
    }
  }

  print() {
    const onPrint = ( printed ) => {
      this.props.endPrint();
    }
    onPrint(this.iframe.contentWindow.print());
  }

  renderTicket( ticketData ) {
    const { types, company, session, comissionsByUser } = this.props
    const type = types.get( ticketData.type_id )
    const sellPrice = ApplyComission( type, comissionsByUser[ ticketData.user_id ] )
    const basePrice = <Currency currency="EUR" quantity={type.price} />
    const gd = <Currency currency="EUR" quantity={sellPrice - type.price} />
    const price = <Currency currency='EUR' quantity={sellPrice} />
    return (
      <div 
        key={ ticketData.id } 
        className="ticket" 
        style={{
          width: '210mm',
          height: '297mm',
          pageBreakAfter: 'always',
          overflow: 'show'
        }}
      >
        <div className="page-row" style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', alignItems:'stretch'}}>
          <div className="page-column ticket-logo">
            <p className="ticket-compname">{company.name}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
              <img alt="" style={{width: '25mm', height:'20mm'}} src={this.props.logo_img} />
            </div> 
            <p className="ticket-cif">NIF: {company.nif}</p>
          </div>
          <div className="page-column ticket-user-data">
            <h3> DATOS DE VENTA </h3>
            <p> { ticketData.code.name } </p>
            <p> { moment(ticketData.created_at).format( 'DD/MM/YYYY HH:mm' ) } </p>            
          </div>
        </div>

        <div className="bordered centered" style={{border:'2px solid black', textAlign: 'center', position:'relative', zIndex: 10, width: '200mm' }}>
          <div className="bordered session-title" style={{position: 'relative', zIndex: 10, borderBottom: '2px solid black', fontWeight: 'bold', fontSize:'14pt', height:'6mm'}}>
            <div className="session-title-darkener"></div>
            <div className="session-title-text">{session.name}</div>
          </div>
          <div className="page-row" style={{position: 'relative', zIndex: 10, height:'85mm', display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', fontSize: '20px'}}>
            <div className="page-column" style={{paddingLeft: '0.5mm', width:'40mm', textAlign:'left'}}>
              <h2 style={{fontSize:'18pt'}}>{ session.recint } </h2>
              <h3>{ session.location }</h3>
              <p className="ticket-date">
                { moment(session.date).format( 'DD MMMM YYYY' ) }
              </p>
              <p className="ticket-date">
                { moment(session.date).format( 'HH:mm' ) } H.
              </p>
            </div>
            <div style={{width:'66.67mm'}}></div> 
            <div className="page-column" style={{textAlign:'right', width:'80mm'}}>
              <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <h2 style={{fontSize: '15pt', width:'40mm', paddingRight: '1mm'}}>{ type.type } </h2>
              </div>
              {ticketData.code.zone && <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <h4 style={{margin: 0, fontSize: '12pt', width:'40mm', paddingRight: '1mm'}}>{ticketData.code.zone.zone}</h4>
              </div>}
              {ticketData.code.row_index && ticketData.code.seat_number && <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <p style={{margin: 0, fontSize: '10pt', width:'40mm', paddingRight: '1mm'}}>FILA: {ticketData.code.row_index} ASIENTO:{ticketData.code.seat_number} </p>
              </div>}
              <div id={ ticketData.id } className="qrcode">
              </div>
              <p className="ticket-price" style={{fontSize: '8pt', margin: 0, marginTop: '1mm'}}> 
                Precio entrada: {basePrice} 
              </p>
              <p className="ticket-price" style={{fontSize: '8pt', margin: 0}}> 
                + Gastos distribución: {gd} 
              </p>
              <p className="ticket-price" style={{fontSize: '12pt', margin: 0, marginTop: '2mm'}}> 
                PRECIO TOTAL
              </p>
              <p className="ticket-price" style={{fontSize: '8pt', margin: 0}}> 
                (Incluye IVA)
              </p>
              <p className="ticket-price" style={{fontWeight: 'bold', fontSize: '42px', margin: 0}}> {price} </p>
            </div>
          </div>
          
          {/* LOGOS */}
          <div style={{borderTop: '2px solid black', height:'22mm', width:'100%'}}>
            <img alt='' style={{width:'100%', height:'20mm', position: 'relative', top: '1mm'}} src={this.props.logos_img} />
          </div>

          {/* BG IMG */}
          <div style={{position:'absolute', top: '6.5mm', left: 0, opacity: 0.75, zIndex: 9, width:'100%', height:'85mm'}}>
            <img alt='' style={{width:'100%', height:'100%'}} src={this.props.header_img}/>
          </div>
        </div>

        <div>
          <div className="ticket-conditions page-row" style={{fontSize:'9pt'}}>
            <h5 className="centered"> LA ADQUISICIÓN DE ESTA ENTRADA REPRESENTA LA ACEPTACIÓN DE LAS SIGUIENTES CONDICIONES: </h5>
            <p>- La organización no garantiza la autenticidad de las entradas adquiridas fuera de los puntos de venta oficiales. </p>
            <p>
              - Al entrar al recinto, puede estar sujeto a un registro según Ley. No se permite la entrada de objetos que puedan ser
              considerados peligrosos por la Organización o prohibidos por la normativa vigente. No se permitirá la entrada de bebidas
              alcohólicas; armas u objetos que puedan ser utulizados como tales; así como la entrada de personas que se encuentren bajo
              los efectos de bebidas alcohólicas, estupefacientes, psicotrópicos, estimulates o sustancias análogas.
            </p>
            <p>
              - Es potestad de la Organización permitir la entrada al recinto una vez comenzado el espectáculo.
            </p>
            <p>
              - La organización se reserva todos los derechos de imagen y propiedad intelectual del espectáculo, quedando prohibida
              cualquier filmación, grabación o reproducción en el interior del recinto salvo autorización expresa del organizador. La
              posesión de esta entrada no da derecho a utilizar la misma con fines publicitarios, de marketing o de promoción.
            </p>
            <p>
              - No se admitirán cambios ni devoluciones, excepto en caso de cancelación del evento.
            </p>
            <p>
              - La organización se reserva el derecho de admisión. Toda entrada rota, en mal estado o con indicios de falsificación,
              autorizará al organizador a privar la entrada al recinto.
            </p>
            <p>
              - Todos los menores de 16 años deberán de ir acompañados de un adulto.
            </p>
            <p>
              - Una vez validada la entrada, esta no podrá usarse para volver a acceder al recinto.
            </p>
            <p>
              - En caso de falsificación de una entrada, prevalecerá la primera que haya sido validada.
            </p>
            <p>
              - Todos los asistentes al evento, independientemente de la edad, deben ser poseedores de una entrada válida.
            </p>
          </div>
        </div>

        <div className="ticket-divider"></div>

        <div className="page-row centered" style={{textAlign: 'center'}}>
          <div>
            <svg id={ ticketData.id } className="barcode" />
          </div>
          <p> { moment(new Date()).format( 'DD/MM/YYYY HH:mm' ) } </p>
        </div>
      </div>
    )
  }

  render() {
    if( !this.props.tickets || !this.props.session || !this.props.company ) {
        return null
    }

    const tickets = [];
    this.props.tickets.forEach(
      ( ticket ) => {
        tickets.push( this.renderTicket( ticket ) );
      }
    )
    return (
      <div>
        <div id="tickets-root" style={{opacity:0, position:"absolute", top: 0}}>
          <button className="button button-possitive" onClick={() => { this.renderPdf() }}>IMPRIMIR</button>
          <div id="tickets-wrapper">
            { tickets }
          </div>
        </div>
        <iframe title="ticket-iframe-wrapper" style={{opacity:0, position:'absolute', pointerEvents: 'none'}} className="ticket-preview" ref={(iframe) => this.iframe = iframe} />
      </div>
    );
  }
}

PrintTicket = connect(
  ( store, props ) => {
    const comissionsMap = store.comissions.data
    const comissionsByUser = {}
    comissionsMap.forEach( comission => {
        comissionsByUser[ comission.user_id ] = comission
    })

    const session = store.sessions.data.get( props.sessionId )
    return {
      me: store.auth.me,
      session,
      types: store.types.data,
      comissionsByUser,
      company: session ? session.company : null,
      tickets: store.sales.toPrint,
      print: store.sales.printRequest,
      logo_img: store.imgcache.cache.get( 'company_logo' ),
      header_img: store.imgcache.cache.get( 'header_img' ),
      logos_img: store.imgcache.cache.get( 'logos_img' )
    };
  },
  ( dispatch ) => {
    return {
      endPrint: bindActionCreators( endPrint, dispatch )
    }
  }
)(PrintTicket);

export default PrintTicket;

import React from 'react'

import { connect } from 'react-redux';

import jsbarcode from 'jsbarcode';
import qrgenerator from 'qrcode-generator';

import moment from 'moment'

class PrintTicket extends React.Component {
  componentDidUpdate() {
    if( this.props.print ) {
      const barcodes = document.getElementsByClassName("barcode");
      for( let i = 0; i < barcodes.length; i++ ) {
        const code = this.props.tickets.get( parseInt( barcodes[ i ].id ) ).code.code;        
        barcodes[ i ].setAttribute( "jsbarcode-format", "CODE128" );
        barcodes[ i ].setAttribute( "jsbarcode-value", code );
      }
      jsbarcode(".barcode").init();


      const qrcodes = document.getElementsByClassName("qrcode");
      for( let i = 0; i < qrcodes.length; i++ ) {
        const _code = this.props.tickets.get( parseInt( qrcodes[ i ].id ) ).code.code;
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
    this.iframe.contentWindow.print();
  }

  renderTicket( ticketData ) {
    const { types, company, session } = this.props
    const type = types.get( ticketData.type_id )
    const price = type ? type.price : 0 
    return (
      <div 
        key={ ticketData.id } 
        className="ticket" 
        style={{
          width: '210mm',
          height: '297mm',
          pageBreakAfter: 'always',
          overflow: 'hidden'
        }}
      >
        <div className="page-row" style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', alignItems:'stretch'}}>
          <div className="page-column ticket-logo">
            {/*TODO: ADD LOGO*/}
            <p className="ticket-compname">{company.name}</p>
            <p className="ticket-cif">CIF: {company.nif}</p>
          </div>
          <div className="page-column ticket-user-data">
            <h3> DATOS DE VENTA </h3>
            <p> { ticketData.name } </p>
            <p> { moment(ticketData.created_at).format( 'DD/MM/YYYY HH:mm' ) } </p>            
          </div>
        </div>

        <div className="bordered centered" style={{border:'2px solid black', textAlign: 'center'}}>
          <div className="bordered session-title" style={{borderBottom: '2px solid black', fontWeight: 'bold', fontSize:'46px'}}>
            <div className="session-title-darkener"></div>
            <div className="session-title-text">{session.name}</div>
          </div>
          <div className="page-row" style={{borderBottom: '2px solid black', display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', fontSize: '20px'}}>
            <div className="page-column">
              <h2>{ session.recint } </h2>
              <h3>{ session.location }</h3>
              <p className="ticket-date">
                { moment(session.date).format( 'DD MMMM YYYY' ) }
              </p>
              <p className="ticket-date">
                { moment(session.date).format( 'HH:mm' ) } H.
              </p>
            </div>
            <div className="page-column">
              <h2>{ ticketData.type } </h2>
              <div id={ ticketData.id } className="qrcode">
              </div>
            </div>
          </div>
          <p className="ticket-price" style={{fontWeight: 'bold', fontSize: '42px', margin: 0}}> {price } € </p>
          <p className="ticket-price-info" style={{margin: 0}}>(Imp. incluidos + Gastos de distribución)</p>
        </div>

        <div className="ticket-conditions page-row">
          <div>
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
              - En ningún caso esta misma entrada permitirá la salida y posterior entrada al recinto.
            </p>
            <p>
              - Toda persona (independientemente de su edad) debe ser poseedora de una entrada para acceder al recinto.
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
        <iframe style={{opacity:0, position:'absolute'}} className="ticket-preview" ref={(iframe) => this.iframe = iframe} />
      </div>
    );
  }
}

PrintTicket = connect(
  ( store, props ) => {
    return {
      session: store.sessions.data.get( props.sessionId ),
      types: store.types.data,
      company: store.auth.me.company,
      tickets: store.sales.toPrint,
      print: store.sales.printRequest
    };
  }
)(PrintTicket);

export default PrintTicket;

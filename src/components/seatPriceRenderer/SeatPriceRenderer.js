import React from 'react'
import { connect } from 'react-redux'

import CalcSeatPrice from '../../entities/SeatPrices/CalcSeatPrice'
import GetSeatState from '../../entities/SeatReserves/GetSeatState'

class SeatPriceRenderer extends React.Component {
    renderTypes( types ) {
        const rendered = []
        types.forEach( type => rendered.push((
            <p>{type.type} ({type.price}€)</p>
        )))

        return rendered
    }
    
    render() {
        const { 
            me,
            seatprices, 
            seatreserves,
            zoneId, 
            row, 
            seatIndex, 
            seatNumber, 
            position
        } = this.props

        if( !zoneId ) {
            return null
        }

        const types = CalcSeatPrice( zoneId, seatprices, row, seatIndex )
        const seatState = GetSeatState(seatreserves, zoneId, row, seatIndex, me.id )
        return (
            <div 
                className="appears-from-bottom"
                style={{
                    pointerEvents:'none',
                    position: 'absolute', 
                    top: position.y - 50, 
                    left: position.x - 50,
                    maxWidth:'100px',
                    padding:'5px',
                    color:'white', 
                    textAlign:'center',
                    background:'rgba(0,0,0,0.7)',
                    zIndex:20,
                    fontSize:'0.6rem'
                }}
            >
                { types.length === 0 && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA:{row} ASIENTO:{seatNumber}</p>
                        <p>SIN PRECIO ASIGNADO</p>
                        <p style={{color:'yellow'}}>NO ESTÁ EN VENTA</p>
                    </div>) 
                }
                { types.length > 0 && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA: <b>{row}</b> ASIENTO: <b>{seatNumber}</b></p>
                        {this.renderTypes( types )}
                        <p style={{color:seatState.color}}>{seatState.state}</p>
                    </div>)
                }
            </div>
        )
    }
}
export default connect(
    ( store ) => {
        return {
            me: store.auth.me,
            seatprices: store.seatprices.data,
            seatreserves: store.seatreserves.data
        }
    }
)(SeatPriceRenderer)
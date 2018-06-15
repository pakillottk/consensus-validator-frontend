import React from 'react'
import { connect } from 'react-redux'

import CalcSeatPrice from '../../entities/SeatPrices/CalcSeatPrice'
import GetSeatState from '../../entities/SeatReserves/GetSeatState'

class SeatPriceRenderer extends React.Component {
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

        const type = CalcSeatPrice( zoneId, seatprices, row, seatIndex )
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
                { type === null && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA:{row} ASIENTO:{seatNumber}</p>
                        <p>SIN PRECIO ASIGNADO</p>
                        <p style={{color:'yellow'}}>NO ESTÁ EN VENTA</p>
                    </div>) 
                }
                { type && (
                    <div style={{pointerEvents:'none'}}>
                        <p>FILA: <b>{row}</b> ASIENTO: <b>{seatNumber}</b></p>
                        <p>{type.type} ({type.price}€)</p>
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
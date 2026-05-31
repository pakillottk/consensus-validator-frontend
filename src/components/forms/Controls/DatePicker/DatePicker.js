import React from 'react'
import DateTime from 'react-datetime'
import './DatePicker.css'

export default class DatePicker extends React.Component {
    render() {
        const { onChange, value, name, disabled } = this.props
        return(
            <div style={{display:'flex', justifyContent:'center'}} className={disabled ? 'disabled' : ''}>
                <DateTime
                    locale="es"
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    value={new Date(value)}
                    onChange={( date ) => { if( onChange ) { onChange( { target: {name: name, value: date} } ) } }}
                />
            </div>
        )
    }
}
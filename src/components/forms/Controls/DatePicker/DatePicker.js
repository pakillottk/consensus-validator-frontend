import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export default class DatePicker extends React.Component {
    render() {
        const { onChange, value, name, disabled } = this.props
        return(
            <div style={{zIndex: 15, textAlign:'center'}} className={disabled ? 'disabled' : ''}>
                <ReactDatePicker
                    selected={value}
                    onChange={( date ) => { if( onChange ) { onChange( { target: {name: name, value: date} } ) } }}
                    showTimeSelect
                    dateFormat='LLL'
                    locale='es'
                    timeIntervals={15}
                />
            </div>
        )
    }
}
import React from 'react'
import Printers from './TicketPrinterIndex'
import Label from '../../ui/form/Input/Input'
import Select from '../../ui/form/Select/Select'

export default class PrinterSelector extends React.Component
{
    renderOptions()
    {
        return Object.keys(Printers).map((printer, index) => {
            return {
                text: printer,
                value: printer
            }
        })
    }

    render()
    {
        const {value, onChange} = this.props
        return(
            <div>
                <Select options={this.renderOptions()} value={value} onChange={onChange} />
            </div>
          )
    }
}
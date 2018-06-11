import React from 'react'
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input'
import Select from '../ui/form/Select/Select'
import Button from '../ui/button/Button'

export default class SeatsEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            rows: props.rows || []
        }
    }

    createSeatRow() {
        const { polygon } = this.props
        const defaultCurvePoint = polygon.centroid
        return {
            type:'line',
            rowOffset: 0,
            rowDirection: 'right',
            orientation:'horizontal',
            seats:0,
            seatSize:8,
            seatSpacing:16,
            startMargin:0,
            p0x: defaultCurvePoint.x,
            p0y: defaultCurvePoint.y,
            p1x: defaultCurvePoint.x,
            p1y: defaultCurvePoint.y,
            p2x: defaultCurvePoint.x,
            p2y: defaultCurvePoint.y
        }
    }

    addRow() {
        this.setState({rows: [...this.state.rows, this.createSeatRow()]})
        this.notifyChanges()
    }

    updateRow( index, field, value, toInt=false ) {
        const rowData = [...this.state.rows]
        rowData[ index ][ field ] = toInt ? parseInt(value, 10):value
        this.setState({rows: rowData})
        this.notifyChanges()
    }

    notifyChanges() {
        const {onChange} = this.props
        if( onChange ) {
            onChange( this.state.rows )
        }
    }

    renderLineFields( index, rowData ) {
        return(
            <div>
                <Label>ORIENTACIÓN</Label>
                <Select 
                    value={rowData.orientation} 
                    options={[{text:'HORIZONTAL',value:'horizontal'},{text:'VERTICAL',value:'vertical'}]} 
                    onChange={(e) => this.updateRow( index, 'orientation', e.target.value )}
                />
                <Label>EMPIEZA EN</Label>
                <Select 
                    value={rowData.rowDirection} 
                    options={[{text:'IZQUIERDA',value:'left'},{text:'DERECHA',value:'right'}]} 
                    onChange={(e) => this.updateRow( index, 'rowDirection', e.target.value )}
                />
                <Label>ALTURA</Label>
                <Input
                   type='number'
                   value={rowData.rowOffset}
                   onChange={(e) => this.updateRow( index, 'rowOffset', e.target.value, true )}
                />
            </div>
        )
    }

    renderCurveFields( index, rowData ) {
        return(
            <div>
                <Label>P0 X</Label>
                <Input
                   type='number'
                   value={rowData.p0x}
                   onChange={(e) => this.updateRow( index, 'p0x', e.target.value, true )}
                />
                <Label>P0 Y</Label>
                <Input
                   type='number'
                   value={rowData.p0y}
                   onChange={(e) => this.updateRow( index, 'p0y', e.target.value, true )}
                />
                <Label>P1 X</Label>
                <Input
                   type='number'
                   value={rowData.p1x}
                   onChange={(e) => this.updateRow( index, 'p1x', e.target.value, true )}
                />
                <Label>P1 Y</Label>
                <Input
                   type='number'
                   value={rowData.p1y}
                   onChange={(e) => this.updateRow( index, 'p1y', e.target.value, true )}
                />
                <Label>P2 X</Label>
                <Input
                   type='number'
                   value={rowData.p2x}
                   onChange={(e) => this.updateRow( index, 'p2x', e.target.value, true )}
                />
                <Label>P2 Y</Label>
                <Input
                   type='number'
                   value={rowData.p2y}
                   onChange={(e) => this.updateRow( index, 'p2y', e.target.value, true )}
                />
            </div>
        )
    }

    renderRowForm( index ) {
        const rowData = this.state.rows[index]
        return(
            <div key={index}>
                <h3>FILA {index+1}</h3>
                <Label>TIPO</Label>
                <Select 
                    value={rowData.type} 
                    options={[{text:'LÍNEA',value:'line'},{text:'CURVA',value:'curve'}]} 
                    onChange={(e) => this.updateRow( index, 'type', e.target.value )}
                />
                {rowData.type === 'line' && this.renderLineFields( index, rowData )}
                {rowData.type === 'curve' && this.renderCurveFields( index, rowData )}
                <Label>MARGEN</Label>
                <Input
                   type='number'
                   value={rowData.startMargin}
                   onChange={(e) => this.updateRow( index, 'startMargin', e.target.value, true )}
                />
                <Label>ASIENTOS</Label>
                <Input
                   type='number'
                   value={rowData.seats}
                   onChange={(e) => this.updateRow( index, 'seats', e.target.value, true )}
                />
                <Label>TAMAÑO ASIENTO</Label>
                <Input
                   type='number'
                   value={rowData.seatSize}
                   onChange={(e) => this.updateRow( index, 'seatSize', e.target.value, true )}
                />
                <Label>ESPACIO ASIENTOS </Label>
                <Input
                   type='number'
                   value={rowData.seatSpacing}
                   onChange={(e) => this.updateRow( index, 'seatSpacing', e.target.value, true )}
                />
            </div>
        )
    }

    render() {
        const { rows } = this.state
        return(
           <div>
               <Button context="possitive" onClick={()=>this.addRow()}>+ AÑADIR FILA</Button>
               {rows.map( (row, index) => this.renderRowForm( index ) )}
           </div> 
        )
    }
}
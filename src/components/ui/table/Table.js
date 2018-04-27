import React from 'react'
import UIThemeable from '../UIThemeable'
import Input from '../form/Input/Input'

class Table extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            selected: {}
        }
    }

    applyThemeStyles( secondary, full, theme ) {
        return {
            container: {
                borderCollapse: 'collapse',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: secondary ? theme.altBorderColor : theme.borderColor,
                width: full ? '100%' : 'auto'
            },
            header: {
                fontSize: '0.8rem',
                backgroundColor: secondary ? theme.thirdColor : theme.secondaryColor
            },
            headerCell: {
                padding: theme.padding.medium
            },
            body: {
                fontSize: '1.15rem',
                backgroundColor: secondary ? theme.secondaryColor : theme.primaryColor,
                color: secondary ? theme.secondaryTextColor : theme.textColor
            },
            bodyCell: {
                textAlign: 'center',
                padding: theme.padding.medium
            },
            totalCell: {
                textAlign: 'center',
                fontSize: '1.2rem',
                color: theme.secondaryTextColor,
                backgroundColor: theme.thirdColor,
                padding: theme.padding.medium
            }
        }
    }

    renderFields( style, fields ) {
        const ths = []
        fields.forEach(
            ( field, index ) => {
                ths.push( 
                    <th key={index} style={style}>
                        {field.label}
                    </th>
                )
            }
        )

        return ths
    }

    renderItem( style, fields, item, isSelected ) {
        const tds = []
        fields.forEach(
            ( field, index ) => {
                const selectedStyle = isSelected ? { fontWeight: 'bold' } : {}
                const itemData = item[field.name]
                let tdContent = itemData
                if( field.displayFormat ) {
                    tdContent = field.displayFormat( itemData )
                }
                if( itemData === undefined  || itemData === null) {
                    tdContent = 'SIN ASIGNAR'
                }
                tds.push(<td key={index} style={{...style, ...selectedStyle}}>{tdContent}</td>)
            }
        )

        return tds
    }

    renderItems( cellStyle, fields, items ) {
        const selected = this.props.selected || {}
        const { multiselect, onItemClick } = this.props
        const onClickCb = onItemClick || (() => {})       

        const trs = []
        items.forEach(
            ( item, index ) => {
                trs.push(
                    <tr 
                        key={index} 
                        className={( onItemClick && !multiselect ) ? 'pointer hovered-transparency' : ''} 
                        onClick={ () => onClickCb( item ) }
                    >
                        { multiselect && <td><Input checked={selected[item.id]} type="checkbox" onChange={(e) => this.handleMultiselect(e, item)}/> </td> }
                        { this.renderItem( cellStyle, fields, item, selected[ item.id ] ) }
                    </tr>
                )
            }
        )

        return trs
    }

    renderTotals( cellStyle, fields, items ) {
        const { calculateTotals } = this.props
        if( !calculateTotals ) {
            return null
        }
        const tds = []
        const totals = calculateTotals( items )
        fields.forEach( ( field, index ) => {
            if( totals[ field.name ] ) {
                tds.push(<td key={index} style={{...cellStyle}}>{totals[ field.name ]}</td>)
            } else {
                tds.push(<td key={index} style={{...cellStyle}}> - </td>)
            }
        })

        return(
            <tr>
                {tds}
            </tr>
        )
    }

    selectAll( items ) {
        const { onSelection } = this.props
        const selected = {}
        //Already selected, reset
        const itemsAmmount = items.size !== undefined ? items.size : items.length 
        if( Object.keys(this.props.selected).length === itemsAmmount ) {
            if( onSelection ) {
                onSelection( selected )
            }
            this.setState({selected})

            return
        }

        items.forEach( item => {
            selected[ item.id ] = item
        })

        if( onSelection ) {
            onSelection( selected )
        }
        this.setState({selected})
    }

    handleMultiselect( event, item ) {
        const { onSelection } = this.props 
        const selected = {...this.props.selected}
        if( selected[ item.id ] ) {
            delete selected[ item.id ]
        } else {
            selected[ item.id ] = item
        }
        if( onSelection ) {
            onSelection( selected )
        }
    }

    render() {
        const { multiselect, secondary, scrollable, theme, items, fields, full } = this.props
        const themeStyles = this.applyThemeStyles( secondary, full, theme )
        const itemCount = items.size !== undefined ? items.size : items.length

        return(
            <div style={{position: 'relative', overflowX: 'auto', zIndex: 0}}> 
                <div style={{maxHeight: scrollable ? '400px' : 'auto', position: 'relative', zIndex: 10}}>              
                    <table style={{...themeStyles.container}}>
                        <thead style={{...themeStyles.header}}>
                            <tr>
                                { multiselect && <th className={itemCount === 0 ? 'disabled': ''} style={{padding: '10px'}}> <Input type="checkbox" onClick={() => this.selectAll(items)}/></th> }
                                { this.renderFields( {...themeStyles.headerCell}, fields ) }
                            </tr>
                        </thead>
                        <tbody style={{...themeStyles.body}}>
                            { this.renderItems( {...themeStyles.bodyCell}, fields, items ) }
                            { this.renderTotals( {...themeStyles.totalCell}, fields, items ) }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default UIThemeable( Table )
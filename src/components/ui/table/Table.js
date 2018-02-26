import React from 'react'
import UIThemeable from '../UIThemeable'

class Table extends React.Component {
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
                fontSize: '0.9rem',
                backgroundColor: secondary ? theme.thirdColor : theme.secondaryColor
            },
            headerCell: {
                padding: theme.padding.medium
            },
            body: {
                fontSize: '1.3rem',
                backgroundColor: secondary ? theme.secondaryColor : theme.primaryColor,
                color: secondary ? theme.secondaryTextColor : theme.textColor
            },
            bodyCell: {
                textAlign: 'center',
                padding: theme.padding.medium
            }
        }
    }

    renderFields( style, fields ) {
        const ths = []
        fields.forEach(
            ( field, index ) => {
                ths.push( <th key={index} style={style}>{field.label}</th> )
            }
        )

        return ths
    }

    renderItem( style, fields, item ) {
        const tds = []
        fields.forEach(
            ( field, index ) => {
                const itemData = item[field.name]
                let tdContent = itemData
                if( field.displayFormat ) {
                    tdContent = field.displayFormat( itemData )
                }
                if( itemData === undefined  || itemData === null) {
                    tdContent = 'SIN ASIGNAR'
                }
                tds.push(<td key={index} style={style}>{tdContent}</td>)
            }
        )

        return tds
    }

    renderItems( cellStyle, fields, items ) {
        const { onItemClick } = this.props
        const onClickCb = onItemClick || (() => {})

        const trs = []
        items.forEach(
            ( item, index ) => {
                trs.push(
                    <tr 
                        key={index} 
                        className={onItemClick ? 'pointer hovered-transparency' : ''} 
                        onClick={ () => onClickCb( item ) }
                    >
                        { this.renderItem( cellStyle, fields, item ) }
                    </tr>
                )
            }
        )

        return trs
    }

    render() {
        const { secondary, theme, items, fields, full } = this.props
        const themeStyles = this.applyThemeStyles( secondary, full, theme )

        return(
            <div style={{overflowX: 'auto'}}>
                <table style={{...themeStyles.container}}>
                    <thead style={{...themeStyles.header}}>
                        <tr>
                            { this.renderFields( {...themeStyles.headerCell}, fields ) }
                        </tr>
                    </thead>
                    <tbody style={{...themeStyles.body}}>
                        { this.renderItems( {...themeStyles.bodyCell}, fields, items ) }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default UIThemeable( Table )
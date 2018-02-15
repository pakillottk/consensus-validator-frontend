import React from 'react'
import UIThemeable from '../UIThemeable'

class Table extends React.Component {
    applyThemeStyles( secondary, theme ) {
        return {
            container: {
                borderCollapse: 'collapse',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: secondary ? theme.altBorderColor : theme.borderColor
            },
            header: {
                fontSize: '1rem',
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
                padding: theme.padding.medium
            }
        }
    }

    render() {
        const { secondary, theme, items, fields } = this.props
        const themeStyles = this.applyThemeStyles( secondary, theme )

        return(
            <table style={{...themeStyles.container}}>
                <thead style={{...themeStyles.header}}>
                    <tr>
                        { fields.map( ( field, index ) => <th key={index} style={{...themeStyles.headerCell}}>{field.label}</th> ) }
                    </tr>
                </thead>
                <tbody style={{...themeStyles.body}}>
                    { items.map(
                        ( item, index ) => {
                            return(
                                <tr key={index}>
                                    {fields.map( ( field, index ) => <td key={index} style={{...themeStyles.bodyCell}}>{item[ field.key ]}</td> )}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        );
    }
}
export default UIThemeable( Table )
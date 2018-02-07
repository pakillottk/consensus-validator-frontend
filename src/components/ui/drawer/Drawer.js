import React from 'react'

import UIThemeable from '../UIThemeable'

class Drawer extends React.Component {
    getColors( secondary, theme ) {
        let colorStyle = {
            background: theme.primaryColor,
            color: theme.textColor
        }
        if( secondary ) {
            colorStyle = {
                ...colorStyle,
                background: theme.secondaryColor, 
                color: theme.secondaryTextColor
            }
        }

        return colorStyle;
    }

    getPosition( right ) {
        let positionStyle = {
            position: 'fixed',
        }

        if( right ) {
            positionStyle = {...positionStyle, right: 0, top: 0 }
        } else {
            positionStyle = {...positionStyle, left: 0, top: 0 }
        }

        return positionStyle
    }

    getSize( width, fullHeight ) {
        let sizeStyle = { width: width }
        if( fullHeight ) {
            sizeStyle = {...sizeStyle, height: '100vh'}
        }

        return sizeStyle
    }

    getPaddingAndMarging( theme ) {
        return {
            padding: theme.padding.medium
        }
    }

    getBorder( theme, width, right ) {
        let borderStyles;
        if( right ) {
            return { 
                borderLeftWidth: width, 
                borderLefColor: theme.borderColor,
                borderLefStyle: 'solid'
            }
        }
        return { 
            borderRightWidth: width, 
            borderRightColor: theme.borderColor,
            borderRightStyle: 'solid'
        }
    }

    computeStyle( props ) {
        const { theme, secondary, width, right, fullHeight } = props

        const colorStyle          = this.getColors( secondary, theme )
        const positionStyle       = this.getPosition( right )
        const sizeStyle           = this.getSize( width, fullHeight )
        const paddingMargingStyle = this.getPaddingAndMarging( theme )
        const borderStyles        = this.getBorder( theme, 2, right )

        return {
            ...colorStyle,
            ...positionStyle,
            ...sizeStyle,
            ...paddingMargingStyle,
            ...borderStyles,
            zIndex: 999
        }
    }

    render() {
        const style = this.computeStyle( this.props );
        return(
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}
export default UIThemeable( Drawer )
import React from 'react'

import UIThemeable from '../UIThemeable'

class Divider extends React.Component {
    applyThemeStyles( vertical, full, secondary, theme ) {
        const size = full ? '100%' : '80%' 
        let sizeStyles = {
            width: size,
            height: '1px',
            margin: theme.padding.medium + ' auto'
        }
        if( vertical ) {
            sizeStyles = {
                width: '1px',
                height: size,
                margin:'auto ' + theme.padding.medium
            }
        }

        return {
            ...sizeStyles,
            backgroundColor: secondary ? theme.altBorderColor : theme.borderColor
        }
    }

    render() {
        const { vertical, full, secondary, theme, styles } = this.props
        const wrapperStyle = vertical ? { height: '100%', width: '1px' } : { width: '100%', height:'1px' }
        const dividerStyles = this.applyThemeStyles( vertical, full, secondary, theme  )
        return <div style={wrapperStyle}> <div style={{ ...dividerStyles, ...styles}}></div> </div>
    }
}
export default UIThemeable( Divider )
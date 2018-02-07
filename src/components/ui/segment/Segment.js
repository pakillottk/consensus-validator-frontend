import React from 'react'

import UIThemeable from '../UIThemeable'
import SegmentStyles from './SegmentStyles.js'

class Segment extends React.Component {
    applyThemeStyles( secondary, theme, ownStyle ) {
        const commonStyle = {
            padding: theme.padding.medium,
            borderColor: theme.borderColor
        }
        if( secondary ) {
            return {
                ...ownStyle,
                color: theme.secondaryTextColor,
                background: theme.secondaryColor,
                ...commonStyle
            }
        }
        return {
            ...ownStyle,
            color: theme.textColor,
            background: theme.primaryColor,
            ...commonStyle            
        }
    }

    render() {
        const { theme, secondary } = this.props

        const styles = this.applyThemeStyles( secondary, theme, SegmentStyles )
        return(
            <div style={styles}>
                { this.props.children }
            </div>
        )
    }
}
export default UIThemeable( Segment )
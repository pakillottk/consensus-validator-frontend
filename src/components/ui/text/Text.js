import React from 'react'

import UIThemeable from '../UIThemeable'

const colorMap = ( theme ) => {
    return {
        default: theme.textColor,
        secondary: theme.secondaryTextColor,
        bright: theme.brightTextColor,
        possitive: theme.possitive,
        negative: theme.negative,
        relevant: theme.relevant
    }
}
class Text extends React.Component {
   componentWillMount() {
       this.colorMap = colorMap( this.props.theme )
   }

   render() {
       const { theme, type } = this.props
       const customStyle = this.props.styles || {}
       let styles = { color: theme.textColor }
       if( type ) {
            styles.color = this.colorMap[ type ]
       }
       return(
            <div style={{...styles, ...customStyle}}>                
               {this.props.children}
            </div>
       )
   } 
}

export default UIThemeable( Text );
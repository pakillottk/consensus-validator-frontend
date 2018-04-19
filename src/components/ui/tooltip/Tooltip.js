import React from 'react'

import UIThemeable from '../UIThemeable'

class Tooltip extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            showTooltip: false
        }
    }

    mouseIn() {
        this.setState({showTooltip: true})
    }

    mouseOut() {
        this.setState({showTooltip: false})
    }

    applyThemeStyles( theme ) {
        return {
            container: {
                border: '1px solid ' + theme.relevant,
                borderRadius: '100%',
                width:'18px',
                height:'18px',
                textAlign: 'center',
                color: theme.relevant,
                position: 'relative'
            },
            tooltip: {
                position:'absolute',
                left:'100%',
                top: '0',
                zIndex: 20,
                backgroundColor: theme.dark,
                padding: theme.padding.medium,
                color: theme.brightTextColor,
                fontSize:'0.75rem',
                minWidth:'10rem',
                textJustify:'justify'
            }
        }
    }

   render() {
       const { theme } = this.props
       const styles = this.applyThemeStyles( theme )
       return(
            <div 
                onMouseEnter={() => this.mouseIn()} 
                onMouseLeave={() => this.mouseOut()} 
                className="pointer" 
                style={styles.container}
            >
                i
                {this.state.showTooltip && <div style={styles.tooltip}>{this.props.children}</div>}
            </div>
       )
   } 
}

export default UIThemeable( Tooltip );
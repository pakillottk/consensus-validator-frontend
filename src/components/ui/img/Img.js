import React from 'react'
import UIThemeable from '../UIThemeable'

class Img extends React.Component {
    computeStyles( size, bordered, theme ) {
        let width = 400;
        switch( size ) {
            case 'micro': {
                width = 30;
                break;
            }
            case 'tiny': {
                width = 80;
                break;
            }
            case 'small': {
                width = 250;
                break;
            }
            case 'medium': {
                width = 400;
                break;
            }
            case 'big': {
                width = 600;
                break;
            }
            case 'large': {
                width = 800;
                break;
            }
            default: {
                width = 400;
                break;
            }
        }

        let borderStyle = {}
        if( bordered ) {
            borderStyle = {
                borderWidth: '2px',
                borderColor: theme.borderColor
            }
        }

        return {
            width: width + 'px',
            ...borderStyle
        }
    }

    render() {
        const { alt, size, bordered, rounded, theme, styles, src } = this.props
        const imgStyle = this.computeStyles( size, bordered, theme )
        return(
            <div style={{...imgStyle, ...styles}}>
                <img alt={alt} className={ rounded ? 'circle' : '' } style={{ width:'100%', height:'100%' }} src={src} />
            </div>
        );
    }
}
export default UIThemeable( Img );
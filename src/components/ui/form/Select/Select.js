import React from 'react'

import UIThemeable from '../../UIThemeable'

class Select extends React.Component {
    applyThemeStyles( full, theme ) {
        return {
            outline: 'none',
            borderColor: theme.altBorderColor,
            borderWidth: '2px',
            borderStyle: 'solid',
            background: theme.primaryColor,
            fontSize: '1rem',
            width: full ? '100%' : 'auto',
            textAlign: full ? 'center' : 'left'
        }
    }

    render() {
        const { options, styles, name, value, full, theme } = this.props;
        const selectStyles = this.applyThemeStyles( full, theme )
        return(
            <div style={{ width: full ? '100%' : 'auto', textAlign: 'center' }}>
                <select name={name} value={value} style={{...selectStyles, ...styles}}>
                    { options.map( ( option, index ) => <option key={index} value={option.value}>{option.text}</option> ) }
                </select>
            </div>
        );
    }
}
export default UIThemeable( Select )
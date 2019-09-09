import React from 'react';

import UIThemeable from '../../UIThemeable'

class Input extends React.Component {
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
        const { noAutocomplete, disabled, onClick, checked, type, name, value, onChange, full, theme, styles } = this.props
        const inputStyle = this.applyThemeStyles( full, theme )
        const checkboxStyle = type === 'checkbox' ? {transform: 'scale(2.0)'} : {}
        return(
            <div className={disabled ? 'disabled' : ''} style={{ textAlign: 'center', width: full ? '100%' : 'auto' }}>
                <input  
                    autoComplete={noAutocomplete ? "off" : "on"}
                    onClick={onClick}
                    checked={checked}
                    type={type} 
                    name={name} 
                    style={{...inputStyle, ...styles, ...checkboxStyle }} 
                    value={value} onChange={onChange} 
                />
            </div>
        );
    }
}

export default UIThemeable( Input )
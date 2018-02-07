import React, { Children } from 'react'
import PropTypes from 'prop-types'

class UIThemeProvider extends React.Component {
    static childContextTypes = {
        theme: PropTypes.object.isRequired
    }

    getChildContext() {
        const { theme } = this.props
        return { theme }
    }

    render() {
        return Children.only( this.props.children )
    }
}

export default UIThemeProvider
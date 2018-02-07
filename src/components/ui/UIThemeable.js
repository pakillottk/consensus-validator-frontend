import React from 'react'
import PropTypes from 'prop-types'

const Themeable = ( ComponentToTheme ) => {
    return class ThemeComponent extends React.Component {
        static contextTypes = {
            theme: PropTypes.object.isRequired
        }

        render() {
            const { theme } = this.context
            return (
                <ComponentToTheme {...this.props} theme={theme} />
            )
        }
    }
}

export default Themeable
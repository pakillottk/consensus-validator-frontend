import React from 'react'

import labelStyles from './LabelStyles'

class Label extends React.Component {
    render() {
        const { styles } = this.props

        return(
            <label style={{ ...labelStyles, styles }} >{this.props.children}</label>
        )
    }
}

export default Label
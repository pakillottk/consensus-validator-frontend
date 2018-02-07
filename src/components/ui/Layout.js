import React from 'react'

import UIThemeable from './UIThemeable'
import Drawer from './drawer/Drawer'

class Layout extends React.Component {
    render() {
        const navWidth = 190
        const contentMargin = navWidth + 10

        const { theme: { font } } = this.props
        return(
            <div style={{ fontFamily: font }}>
                <Drawer secondary width={navWidth+'px'} fullHeight >
                    <h1>CONSENSUS</h1>
                </Drawer>
                <div style={{ marginLeft: contentMargin + 'px', position: 'relative', zIndex: 10 }} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default UIThemeable( Layout )
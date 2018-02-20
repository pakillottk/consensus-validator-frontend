import React from 'react'

import UIThemeable from './UIThemeable'
import Drawer from './drawer/Drawer'
import Divider from './divider/Divider'
import UserInfo from '../userInfo/UserInfo'
import WindowManager from './window/WindowManager'

class Layout extends React.Component {
    render() {
        if( window.location.pathname === '/' ){
            return this.props.children
        }
        const navWidth = 190
        const contentMargin = navWidth + 12

        const { theme: { font }, Navigation } = this.props
        return(
            <div style={{ fontFamily: font }}>
                <WindowManager />
                <Drawer secondary width={navWidth+'px'} fullHeight >
                    <h1>CONSENSUS</h1>
                    <Divider full />
                    <UserInfo />
                    <Divider full />
                    <Navigation />
                </Drawer>
                <div style={{ marginLeft: contentMargin + 'px', position: 'relative', zIndex: 10 }} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default UIThemeable( Layout )
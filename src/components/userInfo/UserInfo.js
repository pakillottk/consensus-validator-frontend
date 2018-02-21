import React from 'react'
import { connect } from 'react-redux'

import UIThemeable from '../ui/UIThemeable'
import Segment from '../ui/segment/Segment'
import Button from '../ui/button/Button'

class UserInfo extends React.Component {
    render() {
        const { me, theme } = this.props
        if( !me ) {
            return null
        }

        return(
            <div>
                <Segment styles={{ 
                    textAlign: 'center', 
                    background: theme.possitive, 
                    color: theme.brightTextColor 
                }}>
                    {me.username}
                </Segment>
                <Segment styles={{ 
                    textAlign: 'center', 
                    background: theme.relevant, 
                    color: theme.brightTextColor 
                }}>
                    {me.role}
                </Segment>
                <Button context="negative" full styles={{margin: 0}}>SALIR</Button>
            </div>
        )
    }
}

UserInfo = UIThemeable( UserInfo )

export default connect( ( store ) => {
    return {
        me: store.auth.me
    }
})( UserInfo )
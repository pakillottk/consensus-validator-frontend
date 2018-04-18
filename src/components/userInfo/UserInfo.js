import React from 'react'
import { connect } from 'react-redux'

import UIThemeable from '../ui/UIThemeable'
import Segment from '../ui/segment/Segment'
import Divider from '../ui/divider/Divider'
import Logout from '../logout/Logout'

import RoleTranslator from '../../entities/roles/RoleTranslator'

class UserInfo extends React.Component {
    render() {
        const { me, theme } = this.props
        if( !me ) {
            return null
        }

        return(
            <div>
                <Segment styles={{padding: '10px'}}>
                    <h3 style={{textAlign: 'center'}}>USUARIO</h3>
                    
                    <Divider full />

                    <Segment styles={{ 
                        textAlign: 'center', 
                        background: theme.dark, 
                        color: theme.brightTextColor,
                        borderRadius: '10px 10px 0 0',
                        padding: '5px',
                        margin: 0
                    }}>
                        {me.username}
                    </Segment>
                    <Segment styles={{ 
                        textAlign: 'center', 
                        background: theme.thirdColor, 
                        color: theme.dark,
                        borderRadius: '0 0 10px 10px' 
                    }}>
                        {RoleTranslator(me.role)}
                    </Segment>
                </Segment>
                
                <Logout />
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
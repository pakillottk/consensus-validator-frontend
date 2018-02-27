import React from 'react'
import Button from '../ui/button/Button'

import AuthAPI from '../../API/APIAuthRouter';
import { logout } from '../../redux/actions/login'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Logout extends React.Component {
    async logout() {
        console.log( AuthAPI )
        await AuthAPI.logout();
        this.props.logout();
    }

    render() {
        return(
            <Button onClick={() => this.logout() }context="negative" full styles={{margin: 0}}>SALIR</Button>
        )
    }
}
export default connect( () => { return {}; }, ( dispatch ) => {
    return {
        logout: bindActionCreators( logout, dispatch )
    };
})( Logout )
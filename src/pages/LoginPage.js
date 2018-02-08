import React from 'react';
import AuthAPI from '../API/APIAuthRouter';

import './LoginPage.css'
import APIAuthRouter from '../API/APIAuthRouter';

import { loginSuccess } from '../redux/actions/login';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            username: '',
            password: '',
            errors: ''
        }
    }

    validateForm() {
        if( this.state.username.length === 0 ) {
            this.setState({ errors: 'Introduzca un nombre de usuario' });
            return false;
        }

        if( this.state.password.length === 0 ) {
            this.setState({ errors: 'Introduzca su contraseña' });
            return false;
        }

        return true;
    }

    async login() {
        if( !this.validateForm() ) {
            return;
        }

        try {
            const tokens = await APIAuthRouter.attemptLogin({
                username: this.state.username,
                password: this.state.password
            });
            //LOGIN SUCCESSFULL
            const me = await APIAuthRouter.getMe();

            this.props.loginSuccess( me, tokens );
            this.props.history.push( '/sessions' );
        } catch( error ) {
            this.setState({ errors: 'No se pudo conectar. Compruebe la conexión y los credenciales.' })
        }
    }

    renderStateBindedInput( type, key ) {
        return(
            <input 
                type={type}
                value={this.state[ key ]}
                onChange={( event ) => {
                    const state = {...this.state};
                    state[ key ] = event.target.value;
                    this.setState( state );
                }}
            /> 
        );
    }

    render() {
        return(
            <div className="login-page-container">
                <div className="login-page-wrapper">
                    <form 
                        onSubmit={( e ) => { 
                            e.preventDefault(); 
                            this.login();
                        }} 
                        className="login-form-wrapper"
                    >
                        <div className="title">INICIAR SESIÓN</div>
                        <div className="login-form-fields">
                            {this.state.errors !== "" && <div className="login-form-errors">
                                {this.state.errors}
                            </div>}

                            <label>USUARIO</label>
                            { this.renderStateBindedInput( 'text', 'username' ) }
                            <label>CONTRASEÑA</label>
                            { this.renderStateBindedInput( 'password', 'password' ) }
                        </div>
                        <button type="submit">ENTRAR</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect( () => { return {} }, ( dispatch ) => {
    return {
        loginSuccess: bindActionCreators( loginSuccess, dispatch )
    }
})( LoginPage );
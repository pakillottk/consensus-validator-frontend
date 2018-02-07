import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css'

class LoginPage extends React.Component {
    render() {
        return(
            <div className="login-page-container">
                <div className="login-page-bg"></div>
                <div className="login-page-wrapper">
                    <div className="login-app-title">CONSENSUS</div>
                    <form className="login-form-wrapper">
                        <div className="title">INICIAR SESIÓN</div>
                        <div className="login-form-fields">
                            <label>USUARIO</label>
                            <input type="text" />
                            <label>CONTRASEÑA</label>
                            <input type="password" />
                        </div>
                        <button type="submit">ENTRAR</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginPage;
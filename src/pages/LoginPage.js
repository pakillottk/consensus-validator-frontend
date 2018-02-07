import React from 'react';
import './LoginPage.css'

class LoginPage extends React.Component {
    render() {
        return(
            <div class="login-page-container">
                <div class="login-page-bg"></div>
                <div class="login-page-wrapper">
                    <div class="login-app-title">CONSENSUS</div>
                    <div class="login-form-wrapper">
                        <div class="title">INICIAR SESIÓN</div>
                        <div class="login-form-fields">
                            <label>USUARIO</label>
                            <input type="text" />
                            <label>CONTRASEÑA</label>
                            <input type="password" />
                        </div>
                        <button type="submit">ENTRAR</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;
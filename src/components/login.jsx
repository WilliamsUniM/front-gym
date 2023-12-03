import React from 'react';
import './login.css';

export default function Login() {
    return (
        <div className="login-wrapper">
            <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{width: 10 + '%'}}/>
            <form>
                <label>
                    <p>USUARIO</p>
                    <input type="text" className="input-user" placeholder='USUARIO'/>
                </label>
                <label>
                    <p>CONTRASEÑA</p>
                    <input type="password" className="input-password" placeholder='CONTRASEÑA' style={{backgroundImage:`${process.env.PUBLIC_URL}/iconuser.png`}}/>
                </label>
                <div>
                    <button type="submit" >INICIAR SESIÓN</button>
                </div>
            </form>
        </div>
    )
}
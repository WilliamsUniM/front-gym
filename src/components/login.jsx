import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const onButtonClick = () => {
        setError("")

        if ("" === email) {
            setError("Por favor ingrese su email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("ingrese un email valido")
            return
        }

        if ("" === password) {
            setError("Por favor ingrese su password")
            return
        }

        if (password.length < 6) {
            setError("El password debe ser mayor a 6 caracteres")
            return
        }

        logIn()
    }

    const logIn = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        })
        .then(r => r.json())
        .then(r => {
            if (r.token) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate('/home', {replace: true})
            } else {
                setError("email o password invalidos")
            }
        })
        .catch(err => {
            console.log("ERROR: ", err)
        })
    }

    return (
        <div className="login-wrapper">
            <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 10 + '%' }} />
            <label>
                <p>USUARIO</p>
                <input value={email} type="text" className="input-user" placeholder='EMAIL' onChange={ev => setEmail(ev.target.value)} />
            </label>
            <label>
                <p>CONTRASEÑA</p>
                <input value={password} type="password" className="input-password" placeholder='CONTRASEÑA' onChange={ev => setPassword(ev.target.value)}
                    style={{ backgroundImage: `${process.env.PUBLIC_URL}/iconuser.png` }} />
            </label>
            <div>
                <button className="button" onClick={onButtonClick}>INICIAR SESIÓN</button>
            </div>
            <label><p>{error}</p></label>
        </div>
    )
}
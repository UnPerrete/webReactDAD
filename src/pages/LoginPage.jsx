import React, { useContext } from 'react'
import { useState } from 'react';
import { LoginContext } from '../context';
import { useNavigate } from 'react-router';


export function LoginPage() {
    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const { updateLoginData } = useContext(LoginContext)
    const navigate = useNavigate()

    const handleChange = (event) =>{
        const {name,value} = event.target
        if(name === "user") setUser(value);
        if(name === "email") setEmail(value);
        if(name === "password") setPassword(value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        updateLoginData({
            user,
            email,
            password
        })

        navigate('/');
    }
    return (
        <div class="container text-start">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="user" className="form-label">Nombre de usuario</label>
                    <input 
                    type="text" 
                    name="user"
                    value={user}
                    onChange={handleChange}
                    className="form-control" 
                    id="user" 
                    aria-describedby="emailHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Correo electrónico</label>
                    <input 
                    type="email"
                    name="email" 
                    value={email}
                    onChange={handleChange}
                    className="form-control" 
                    id="mail" 
                    aria-describedby="emailHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                    type="password" 
                    name='password'
                    value={password}
                    onChange={handleChange}
                    className="form-control" 
                    id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>

        </div>

    )
}

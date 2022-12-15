import React, { useState} from 'react'
import Cookies from "universal-cookie"
import './login.css';

import { loginCookies } from "../../Cookies";
const Cookie =new Cookies();

export function Login(){
    
    const[user,setUser] = useState("");
    const[password,setPassword] = useState("");
    const[log] = useState("");

    const onChangeUser =  (user)=>{
        setUser(user.target.value);
    }
    
    const onChangePas = (password)=>{
    setPassword(password.target.value)};

    const requestOptions={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        
        body: JSON.stringify({user : user, password : password })
    };

    const login = async()=>{
        fetch('http://localhost:8080/login',requestOptions)
        .then(response=>response.json())
        .then(response => {if (response.status == 400) {
            document.getElementById("user").style.border = "1px solid red";
            document.getElementById("password").style.border = "1px solid red";
            document.getElementById("incorrecto").style.visibility = "visible"
        }else{
            window.location.replace("/") 
            loginCookies(response.token)
            Cookie.set("user", response.id_user + "," + response.token, {path: "/"})  
        }})

    }; 

    function color(id) {
        document.getElementById(id).style.border = "1px solid #c7c7c7";
        document.getElementById("incorrecto").style.visibility = "hidden"
    }
   
    const handleSubmit= (event)=>{

            event.preventDefault();
       
            login();
    };

    return(
        <main>
            <div class="contenedor-login">
                <h1 class="title-login">Iniciar Sesion</h1>
                <form onSubmit={handleSubmit} class="form-login">
                    <div class="div-input">
                        <input id="user" type="text" placeholder="Usuario" class="input-datos" maxlength="150" onChange={onChangeUser} onClick={() => color("user")} value ={user}/>
                    </div>
                    <div class="div-input">
                        <input id="password" type="password" placeholder="Contraseña" class="input-datos" maxlength="150" onChange={onChangePas} onClick={() => color("password")} value={password}/>
                    </div>
                    <div class="div-confirmar">
                        <button class="confirmar" type="submit">Ingresar</button>
                        <p id='incorrecto'>Usuario o contraseña incorrecto</p>
                    </div>
                </form>
            </div>
        </main>
    );   
}
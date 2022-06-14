import React from 'react'
import './login.css';

export const Login = () => {
    return (
        <main>
            <div class="contenedor-login">
                <h1 class="title-login">Iniciar Sesion</h1>
                <form class="form-login">
                    <div class="div-input">
                        <input id="nombre-usuario" type="text" placeholder="Usuario" class="input-datos" maxlength="150" />
                    </div>
                    <div class="div-input">
                        <input id="contraseña" type="password" placeholder="Contraseña" class="input-datos" maxlength="150" />
                    </div>
                    <div class="div-confirmar">
                        <button class="confirmar">Ingresar</button>
                    </div>

                </form>
            </div>
        </main>
    )
}
import React, { useState } from 'react'
import Tiveo from "../../images/tiveo.png";
import { getUserCookies, logOutCookies } from "../../Cookies";
import './header.css';


const handleSubmit = (event) => {
  event.preventDefault();
  BuscarTxt();
};

function BuscarTxt() {
  var txt = document.getElementById('input-buscar').value;
  if (txt != "") {
    window.location.href = window.location.protocol + "//localhost:3000/search-producto/" + txt;
  }
}

function Carrito() {
  window.location.href = window.location.protocol + "//localhost:3000/carrito";
}

function Login() {
  window.location.href = window.location.protocol + "//localhost:3000/login";
}



export const Header = () => {
  const [UserToken, setUserToken] = useState("")

  if (UserToken == "") {
    setUserToken(getUserCookies())
  }
  return (
    <header class="header">
      <div class="color-1">
        <div class="padre">

          <div class="logo-div">
            <a class="btn-logo" href='http://localhost:3000/'>
              <img class="tamaño-logo" src={Tiveo} />
            </a>
          </div>

          <section class="contenedor-search">
            <form class="div-search" onSubmit={handleSubmit}>
              <input class="input-search" id="input-buscar" type="text" placeholder="Busca lo que quieras..." />
              <button href="" type="submit" class="boton-search"><svg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 30 30" width="25px" height="25px">
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg></button>
            </form>
          </section>

          {UserToken != undefined ?
            <div className='cart' on onClick={Carrito}> <box-icon name="cart"></box-icon >
            </div>
            :
            <div className='cart' on onClick={Login}><box-icon name="cart"></box-icon>
            </div>}

        </div>
      </div>
      <div class="color-2">
        <div class="madre">

          <div class="opciones flex">
            <a id="productos" class="txt-opciones" href='http://localhost:3000/'>
              Inicio
            </a>
            <a id="categorias" class="txt-opciones" href='http://localhost:3000/categorias'>
              Categorias
            </a>
          </div>
          <div class="usuario">
            {UserToken != undefined ?
              <div>
                <a href="http://localhost:3000/compras" class="usuario-opciones-2" >Mis compras</a>
                <a href='#' class="usuario-opciones" onClick={() => { logOutCookies(); window.location.replace("/login") }}>Salir</a>
              </div>
              :
              <a href="http://localhost:3000/login" class="usuario-opciones" > Iniciar Sesion </a>
            }
          </div>
        </div>
      </div>
    </header >
  )
}





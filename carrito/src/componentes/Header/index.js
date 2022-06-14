import React from 'react'
import Tiveo from "../../images/tiveo.png";
import './header.css';

function BuscarTxt(){
  var txt = document.getElementById('input-buscar').value;
  window.location.href = window.location.protocol + "//localhost:3000/search-producto/"+txt;
}

export const Header = () => {
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
            <div class="div-search">
              <input class="input-search" id="input-buscar" type="text" placeholder="Busca lo que quieras..." />
              <button href="" type="submit" on onClick={() => BuscarTxt()} class="boton-search"><svg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 30 30" width="25px" height="25px">
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg></button>
            </div>
          </section>

          <div className='cart'>
            <box-icon name="cart"></box-icon>
            <span className='item_total'>0</span>
          </div>

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
            <a class="usuario-opciones" href='http://localhost:3000/login'>
              <div class="div-usuario">
                <p class="txt-usuario">Iniciar Sesion</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header >
  )
}

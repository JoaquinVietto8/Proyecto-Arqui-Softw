import React from 'react'
import TiveoBlanco from "../../images/tiveo-blanco.png";
import './footer.css';

export const Footer = () => {
  return (
    <footer>
            <div class="div-footer">
                <div class="logo-div-footer">
                    <a class="btn-logo-footer" href="">
                        <img class="tamaño-logo-footer" src={TiveoBlanco}/>
                    </a>
                </div>
            </div>
    </footer>
  )
}

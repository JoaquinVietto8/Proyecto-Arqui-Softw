import React from "react";
import Productos from "../../images/productos.png";

function BotonIn(object){
    document.getElementById(object.name).style.transform = "scale(1.1)";
}

function BotonOut(object) {
    document.getElementById(object.name).style.transform = "scale(1)";
}

function Redirigir(object){
    window.location.href = window.location.protocol + "//localhost:3000/categorias/"+object.name;
}




export const ObjectCategorias = (
    { id,
        name,
        icon,
        cantidad,
    }) => {
    return (
        <div onClick={() => Redirigir({name})} class="boton-categoria">
            <div  class="contenido-boton" id={name} onMouseOver={() => BotonIn({name})} onMouseOut={() => BotonOut({name})}>
                <div class="div-icon">
                    <img class="icono-categoria" src={icon} />
                </div>
                
                <div class="div-info">
                    <p class="letras-categorias">{name}</p>
                    <div class="sub-div-info">
                        <img class="productos" src={Productos} />
                        <p>
                            {cantidad}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}


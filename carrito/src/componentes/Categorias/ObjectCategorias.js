import React from "react";
import Productos from "../../images/productos.png";

function BotonIn(object){
    document.getElementById(object.name).style.transform = "scale(1.1)";
}

function BotonOut(object) {
    document.getElementById(object.name).style.transform = "scale(1)";
}

export const ObjectCategorias = (
    { id,
        name,
        icon,
        cantidad,
    }) => {
    return (
        <a href={`http://localhost:8080/categorias/${name}`} class="boton">
            <div class="contenido-boton" id={name} onMouseOver={() => BotonIn({name})} onMouseOut={() => BotonOut({name})}>
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

        </a>
    )
}
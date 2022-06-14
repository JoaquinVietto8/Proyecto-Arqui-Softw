import React from "react";

export const ObjectProductos = (
    { id,
        name,
        picture,
        price,
        stock,
        id_category
    }) => {
    return (
        <a class="producto" href={`localhost:3000/productos/${id}`}>
            <div class="contender-imagen">
                <img class="imagen" src={picture} alt={name} />
            </div>
            <div class="datos-padre">
                <div class="div-nombre">
                    <p class="txt-nombre">{name}</p>
                </div>
                <div class="div-precio">
                    <p class="precio">${price}</p>
                </div>
            </div>
        </a>
    )
}
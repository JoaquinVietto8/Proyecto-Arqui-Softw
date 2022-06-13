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
        <div class="producto">
            <div class="contender-imagen">
                <img class="imagen" src={picture} alt={name} />
            </div>
            <div class="datos-padre">
                <div class="div-nombre">
                    <p class="txt-nombre">{name}</p>
                </div>

                <p class="precio">${price}</p>
                <div class="datos-hijo">
                    <a href="http://localhost:8080/products/" class="boton">
                        <div class="div-boton">
                            Ver producto
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
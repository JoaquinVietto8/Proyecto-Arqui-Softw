import React, { useState } from "react";
import { addToCart } from "../Carrito"
import { getUserCookies } from "../../Cookies";

function Confirmar(id, stock) {
    let cant = document.getElementById("cantidad").value
    if (cant <= 0 || cant === "" || cant > stock) {
        document.getElementById("cantidad").style.border = "1px solid red";
    } else {
        addToCart(id, cant)
    }
}

function color() {
    document.getElementById("cantidad").style.border = "1px solid #c7c7c7";
}

function Login() {
    window.location.href = window.location.protocol + "//localhost:3000/login";
}

export const ObjectProducto = (
    { id,
        name,
        picture,
        price,
        stock,
        descripcion
    }) => {

        const [UserToken, setUserToken] = useState("")
        if (UserToken === "") {
            setUserToken(getUserCookies())
        }
        
    return (
        <div class="div-producto-2">
            <div class="div-nombre-2">
                <p class="txt-nombre-2">{name}</p>
            </div>
            <div class="div-producto-3">
                <div class="contender-imagen-2">
                    <img class="imagen-2" src={picture} alt={name} />
                </div>
                <div class="descripcion">
                    {descripcion}
                </div>
            </div>
            <div class="div-precio-2">
                <p class="precio-2">${price}</p>
                <p class="stock-2">Stock disponible: {stock}</p>
            </div>

            {stock > 0 ?
                <div calss="div-carrito-2">
                    <div class="div-cantidad-2">
                        Cantidad
                        <input type="number" id="cantidad" onChange={color} />
                    </div>
                    {UserToken !== undefined ?
                        <button class="confirmar-2" onClick={() => Confirmar(id, stock)}>
                            Agregar al carrito
                            <box-icon name="cart"></box-icon >
                        </button>
                         :
                        <button class="confirmar-2" on onClick={Login}>
                            Agregar al carrito
                            <box-icon name="cart"></box-icon >
                        </button>
                    }
                </div>
                :
                <p class="no-disponible">Este producto no esta disponible</p>
            }

        </div>

    )
}
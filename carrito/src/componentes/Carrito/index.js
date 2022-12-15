import React, { useState, useEffect, List, Checkbox } from "react";
import "./carrito.css"
import Cookies from "universal-cookie";
import { CrearOrden } from "../Compras/nueva-compra";
const Cookie = new Cookies();

const id_user = setUser()


/******************************************************************************************************** */

export function addToCart(id, cant) {
  window.location.href = window.location.protocol + "//localhost:3000/carrito";
  let cookieUser = Cookie.get("user")
  let id_user;
  let token;
  if (cookieUser != undefined) {
    let array = cookieUser.split(",")
    id_user = array[0]
    token = array[1]
  }
  else {
    id_user = "undefined"
  }
  let cookie = Cookie.get("cart" + id_user);

  if (cookie == undefined) {
    Cookie.set("cart" + id_user, id + "," + cant + ";", { path: "/" });

    return
  }
  let newCookie = ""
  let isNewItem = true
  let toCompare = cookie.split(";")
  let total = 0;
  toCompare.forEach((item) => {
    if (item != "") {
      let array = item.split(",")
      let item_id = array[0]
      let item_quantity = array[1]
      if (id == item_id) {
        item_quantity = Number(item_quantity) + Number(cant)
        isNewItem = false
      }
      newCookie += item_id + "," + item_quantity + ";"
      total += Number(item_quantity);
    }
  });
  if (isNewItem) {
    newCookie += id + "," + Number(cant) + ";"
    total += Number(cant);
  }
  cookie = newCookie
  Cookie.set("cart" + id_user, cookie, { path: "/" })

  return
}

/******************************************************************************************************** */

function setUser() {
  let cookieUser = Cookie.get("user")

  if (cookieUser != undefined) {
    let array = cookieUser.split(",")
    return array[0]
  } else {
    return "undefined"
  }


}

function auxiliar() {
  CrearOrden();
}

async function getProductById(id) {
  return fetch("http://localhost:8080/productos/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}


async function getCartProducts() {

  let items = []
  let a = Cookie.get("cart" + id_user).split(";")

  for (let i = 0; i < a.length; i++) {
    let item = a[i];
    if (item != "") {
      let array = item.split(",")
      let id = array[0]
      let quantity = array[1]
      let product = await getProductById(id)
      product.quantity = quantity;
      items.push(product)
    }
  }
  return items
}


function getOptions(n) {
  let options = []
  for (let i = 1; i <= n; i++) {
    options.push(i)
  }
  return options.map((option) =>
    <option value={option}> {option} </option>
  )
}

function remove(n, p_id) {

  let cookie = Cookie.get("cart" + id_user);
  let newCookie = ""
  let toCompare = cookie.split(";")
  let isEmpty = false
  toCompare.forEach((item) => {
    if (item != "") {
      let array = item.split(",")
      let item_id = array[0]
      let item_quantity = array[1]
      if (p_id == item_id) {
        item_quantity = Number(item_quantity) - n
        if (item_quantity == 0) {
          isEmpty = true
        }
      }
      if (p_id == item_id && !isEmpty) {
        newCookie += item_id + "," + item_quantity + ";"
      }
      else if (p_id != item_id) {
        newCookie += item_id + "," + item_quantity + ";"
      }
    }
  });
  cookie = newCookie
  Cookie.set("cart" + id_user, cookie, { path: "/" })
  window.location.reload()
  return
}


function showProducts(products) {

  return products.map((product) =>


    <div class="div-carrito">
      <div obj={product} key={product.id_product} >
        <a href={`http://localhost:3000/producto/${product.id_product}`}>{product.name}</a>
        <div class="padre-details-carrito">
          <img class="imagen-carrito" src={product.picture_url} alt={product.name} />
          <div class="hijo-details-carrito">
            <p>Precio unitario: ${product.price}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Subtotal: ${product.quantity * product.price}</p>
          </div>
        </div>
        <div class="remover-div">
          <h3 class="remover-txt"> Eliminar </h3>
          <select class="remover-input" id={"removeSelect" + product.id_product}>
            {getOptions(product.quantity)}
          </select>
          <button class="remover" onClick={() => remove(document.getElementById("removeSelect" + product.id_product).value, product.id_product)}><box-icon name="trash"></box-icon ></button>
          <div />
        </div>
      </div>
    </div>

  )
}

async function setCart(setter, setterTotal) {
  let total = 0;
  await getCartProducts().then(response => {
    setter(response)
    response.forEach((item) => {
      total += item.price * item.quantity;
    });
    setterTotal(total)
  })
}

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  if (cartProducts.length <= 0) {
    setCart(setCartProducts, setTotal)
  }



  const renderOrderButton = (
    <div class="total-pagar">
      <span> Total: ${total} </span>
    </div>
  )

  return (
    <main>
      <h1 class="title-carrito"> TU CARRITO</h1>
      {Cookie.get("cart" + id_user) ? showProducts(cartProducts) : <p></p>}

      {cartProducts.length >= 1 ?
        <div class="div-pago">
          {renderOrderButton}
          <button class="confirmar-compra" onClick={() => auxiliar()}> Confirmar compra</button>
        </div> :
        <div class="div-carrito-vacio">
          <p class="txt-carrito-vacio">Aun no agregaste nada al carrito.</p>
        </div>
      }
    </main>
  );
}

export default Cart;




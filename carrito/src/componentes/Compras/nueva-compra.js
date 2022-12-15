import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import swal from "sweetalert2";

const Cookie = new Cookies();
const id_user = setUser()

function setUser() {
  let cookieUser = Cookie.get("user")

  if (cookieUser != undefined) {
    let array = cookieUser.split(",")
    return array[0]
  } else {
    return "undefined"
  }
}

function vaciarCarrito() {

  document.cookie = "cart" + id_user + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export const CrearOrden = () => {


  let cookie = Cookie.get("user")
  let id_user = parseInt(cookie.split(",")[0]);
  let orderDetails = { 'id_product': 0, 'cantidad': 0 }
  let OrderDetails_ = [];

  let a = Cookie.get("cart" + id_user).split(";")


  for (let i = 0; i < a.length; i++) {
    let item = a[i];
    if (item != "") {
      let array = item.split(",")
      orderDetails = { 'id_product': 0, 'cantidad': 0 }
      orderDetails.id_product = parseInt(array[0])
      orderDetails.cantidad = parseInt(array[1])

      OrderDetails_.push(orderDetails)

    }
  }


  const crearOrden = async () => {
    fetch('http://localhost:8080/new-order', requestOptions)
      .then(response => {
        if (response.status != 201) {
          swal.fire({customClass: {confirmButton: 'boton-ok'}, icon: 'error', text: "No se pudo realizar la compra" }
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
              return response.json()
            }
          })
        } else {
          swal.fire({customClass: {confirmButton: 'boton-ok'},icon: 'success', text: "Compra realizada con éxito" }
          ).then((result) => {
            if (result.isConfirmed) {
              Cookie.remove("cart" + id_user)
              window.location.replace("http://localhost:3000/compras")
              vaciarCarrito()
              return response.json()
            }
          })

        }
      })
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({
      id_user: id_user,
      OrderDetails: OrderDetails_
    })
  };

  crearOrden();

}
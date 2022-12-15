import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ObjectCompras } from "./ObjectCompras";
import './compras.css';

const Cookie = new Cookies();

var vacio = false;
export const Compras = () => {
  let cookie = Cookie.get("user")
  let token;
  let id_user;
  if (cookie != undefined) {
    let array = cookie.split(",")
    token = array[1]
    id_user = array[0]
  } else {
    token = "undefined"
  }
  const [compras, setOrdenes] = useState([]);

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const res = await fetch('http://localhost:8080/compras/' + token)
      const data = await res.json()
      setOrdenes(data)
      console.log(data)
      if (data == null) {
        vacio = true
      } else {
        vacio = false
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  if (vacio == false) {
    return (
      <main>
        <div class="contenedor-compras">
          <h1 class="title-compras">Mis Compras</h1>
          {
            compras?.map(order => (
              <ObjectCompras key={order.id}
                id={order.id_order}
                total={order.total}
                id_user={order.id_user}
                fecha={order.fecha}
                OrderDetails={order.OrderDetails}
              />
            ))
          }
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div class="contenedor-compras">
          <h1 class="title-compras">Mis Compras</h1>
          <div class="div-compras-vacio">
            <p class="txt-compras-vacio">Aun no  has comprado nada.</p>
          </div>
        </div>
      </main>
    )
  }
}
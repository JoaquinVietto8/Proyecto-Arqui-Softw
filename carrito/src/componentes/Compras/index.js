import React, { useEffect, useState } from "react";
import { ObjectCompras } from "./ObjectCompras";
import './compras.css';

export const Compras = () => {

  const [compras, setCompras] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/orders/1')
      .then((response) => response.json())
    setCompras(response)
    console.log(response);
  };
  useEffect(() => {
    fetchApi();
  }, [])
  return (
    <>
      <main>
        <div class="contenedor-compras">
        <h1 class="title">Mis Compras</h1>
          {
            compras.map(order => (
              <ObjectCompras key={order.id}
                id={order.id_order}
                total={order.total}
                id_user={order.id_user}
                fecha={order.fecha}
              />
            ))
          }
        </div>
      </main>
    </>
  )
}
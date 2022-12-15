import React, { useEffect, useState } from "react";
import { ObjectProducto } from "./ObjectProducto";
import './producto.css';

var pathname = window.location.pathname.split("/");
let id = pathname[pathname.length - 1]

export const Producto = () => {

  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/producto/' + id)
      .then((response) => response.json())
    setProductos(response)
    console.log(response);
  };
  useEffect(() => {
    fetchApi();
  }, [])
  return (
    <>
      <main>
        <div class="contenedor-productos">
          {
            productos.map((producto) => (
              <ObjectProducto key={producto.id}
                id={producto.id_product}
                name={producto.name}
                price={producto.price}
                picture={producto.picture_url}
                stock={producto.stock}
                id_category={producto.id_category}
                descripcion={producto.descripcion}
              />
            ))
          }
        </div>
      </main>
    </>
  )
}

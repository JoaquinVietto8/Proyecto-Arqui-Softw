import React, { useEffect, useState } from "react";
import { ObjectProductos } from "./ObjectProductos";
import './productos.css';

export const Productos = () => {

  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/productos')
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
        <h1 class="title-productos"> Nuestros productos</h1>
          {
            productos.map(producto => (
              <ObjectProductos key={producto.id}
                id={producto.id_product}
                name={producto.name}
                price={producto.price}
                picture={producto.picture_url}
                stock={producto.stock}
                id_category={producto.id_category}
              />
            ))
          }
        </div>
      </main>
    </>
  )
}

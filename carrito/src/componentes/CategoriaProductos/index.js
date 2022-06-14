import React, { useEffect, useState } from "react";
import { ObjectCategoriaProductos } from "./ObjectCategoriaProductos";
import './productos.css';

export const CategeoriaProductos = () => {

  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/categorias/:name')
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
        <h1 class="title"> Notebooks</h1>
          {
            productos.map(producto => (
              <ObjectCategoriaProductos key={producto.id}
                id={producto.id_producto}
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

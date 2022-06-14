import React, { useEffect, useState } from "react";
import { ObjectCategoriaProductos } from "./ObjectCategoriaProductos";
import './categoria-productos.css';
import '../index.css';

var pathname = window.location.pathname.split("/");
let categoria = pathname[pathname.length - 1]

export const CategoriaProductos = () => {

  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/categorias/'+categoria)
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
        <h1 class="title-categoria-producto">{categoria}</h1>
          {
            productos.map(producto => (
              <ObjectCategoriaProductos key={producto.id}
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

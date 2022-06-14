import React, { useEffect, useState } from "react";
import { ObjectSearch } from "./ObjectSearch";
import './search.css';
import '../index.css';

var pathname = window.location.pathname.split("/");
let palabra = pathname[pathname.length - 1]

export const Buscador = () => {

  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/search-producto/'+palabra)
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
        <h1 class="title-categoria-producto">Buscando: {palabra}</h1>
          {
            productos.map(producto => (
              <ObjectSearch key={producto.id}
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
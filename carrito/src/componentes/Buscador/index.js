import React, { useEffect, useState } from "react";
import { ObjectSearch } from "./ObjectSearch";
import '../index.css';

var pathname = window.location.pathname.split("/");
let palabra = pathname[pathname.length - 1]

var vacio = false;
var palabra_;
export const Buscador = () => {
  const [productos, setProductos] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/search-producto/' + palabra)
      .then((response) => response.json())
    setProductos(response)
    console.log(response)
    if (response == null) {
      vacio = true
    } else {
      vacio = false
    }
  };
  useEffect(() => {
    fetchApi();
  }, [])
  if (vacio ===false) {
   palabra_ = palabra.replace(/%20/g," ");
    return (
      <main>
        <div class="contenedor-productos">
          <h1 class="title-categoria-producto">Buscando: {palabra_}</h1>
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
    )
  } else {
   palabra_ = palabra.replace(/%20/g," ");
    return (
      <main>
        <div class="contenedor-productos">
          <h1 class="title-categoria-producto">Buscando: {palabra_}</h1>
          <h2>No se encontraron resultados.</h2>
        </div>
      </main>
    )
  }
}

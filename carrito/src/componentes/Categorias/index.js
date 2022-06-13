import React, { useEffect, useState } from "react";
import { ObjectCategorias } from "./ObjectCategorias";
import './categorias.css';

export const Categorias = () => {

  const [categorias, setCategorias] = useState([])
  const fetchApi = async () => {
    const response = await fetch('http://localhost:8080/categorias')
      .then((response) => response.json())
    setCategorias(response)
    console.log(response);
  };
  useEffect(() => {
    fetchApi();
  }, [])
  return (
    <>
      <main>
        <div class="contenedor-categorias">
        <h1 class="title"> Categorias</h1>
          {
            categorias.map(categoria => (
              <ObjectCategorias key={categoria.id}
                id={categoria.id_categoria}
                name={categoria.name}
                icon={categoria.icon}
                cantidad={categoria.cantidad}
              />
            ))
          }
        </div>
      </main>
    </>
  )
}
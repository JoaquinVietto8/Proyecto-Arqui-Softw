import React from "react"
import { Routes, Route } from "react-router-dom";
import { Productos } from "./Productos";
import { Categorias } from "./Categorias";
import { CategoriaProductos } from "./CategoriaProductos";
import { Buscador } from "./Buscador";
import { Login } from "./Login";

export const Paginas = () => {
    return (
        <Routes>
            <Route path='/categorias/:name' exact element={<CategoriaProductos />} />
            <Route path='/search-producto/:search' exact element={<Buscador />} />
            <Route path='/categorias' exact element={<Categorias />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/' exact element={<Productos />} />
        </Routes>
    )
}
import React from "react"
import { Routes, Route } from "react-router-dom";
import { Productos } from "./Productos";
import { Producto } from "./Producto";
import { Categorias } from "./Categorias";
import { CategoriaProductos } from "./CategoriaProductos";
import { Buscador } from "./Buscador";
import { Login } from "./Login";
import { Compras } from "./Compras"
import  Carrito  from "./Carrito"

export const Paginas = () => {
    return (
        <Routes>
            <Route path='/categorias/:id/:name' exact element={<CategoriaProductos />} />
            <Route path='/search-producto/:search' exact element={<Buscador />} />
            <Route path='/compras' exact element={<Compras />} />
            <Route path='/categorias' exact element={<Categorias />} />
            <Route path='/producto/:id' exact element={<Producto />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/carrito' exact element={<Carrito />} />
            <Route path='/' exact element={<Productos />} />
        </Routes>
    )
}
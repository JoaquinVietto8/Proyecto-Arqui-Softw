import React from "react"
import { Routes, Route } from "react-router-dom";
import { Productos } from "./Productos";
import { Categorias } from "./Categorias";
import { Login } from "./Login";



export const Paginas = () => {
    return (
        <Routes>
            <Route path='/categorias' exact element={<Categorias />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/' exact element={<Productos />} />
        </Routes>
    )
}
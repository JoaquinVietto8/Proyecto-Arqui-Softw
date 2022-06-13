import React from "react";
import { Header } from "./componentes/Header";
import { Footer } from "./componentes/Footer";
import { Compras } from "./componentes/Compras";
import 'boxicons';

function App() {
  return (
    <div className="App">
     <Header />
     <Compras />
     <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from "./componentes/Header";
import { Footer } from "./componentes/Footer";
import { Paginas } from "./componentes/Paginas.js";
import 'boxicons';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Paginas />
      </Router>
      <Footer />
    </div>
  );
}

export default App;

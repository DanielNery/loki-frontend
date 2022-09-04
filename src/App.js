import React from "react";
import './index.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import DespesaCadastro from "./pages/Despesa/Cadastro/DespesaCadastro";
import DespesaListar from "./pages/Despesa/Listar/DespesaListar";
import ReceitaCadastro from "./pages/Receita/Cadastro/ReceitaCadastro";
import ReceitaListar from "./pages/Receita/Listar/ReceitaListar";
import Home from "./pages/Home/Home";
import CalendarioListar from "./pages/Calendario/CalendarionListar/CalendarioListar";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    
    // Rotas
    <Router>
      <Routes>
        
        <Route  path="/" element={<Login />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/cadastro" element={<Cadastro />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/despesa/cadastro" element={<DespesaCadastro />} />
        <Route  path="/despesa/listar" element={<DespesaListar />} />
        <Route  path="/receita/cadastro" element={<ReceitaCadastro />} />
        <Route  path="/receita/listar" element={<ReceitaListar />} />
        <Route  path="/calendario/listar" element={<CalendarioListar />} />
        <Route  path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>

  );
}

export default App;

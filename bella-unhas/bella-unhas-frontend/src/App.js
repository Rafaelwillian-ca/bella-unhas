import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Agendar from './pages/Agendar';
import Contato from './pages/Contato';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

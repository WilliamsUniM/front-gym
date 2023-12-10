import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Usuarios from './components/usuarios';
import Pagos from './components/pagos';
import Reportes from './components/reportes';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/usuarios" element={<Usuarios />} />
      <Route exact path="/pagos" element={<Pagos />} />
      <Route exact path="/reportes" element={<Reportes />} />
    </Routes>
  );
}

export default App;

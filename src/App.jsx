// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Sigin/Login";
import Register from "./Sigin/Register";

function App() {
  return (
    <Routes>
      <Route path="/home/*" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

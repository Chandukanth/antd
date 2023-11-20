// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthForm from "./views/authform";
import "./App.css"
import Photos from "./views";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/Home" element={<Photos />} />
        
      </Routes>
    </Router>
  );
}

export default App;
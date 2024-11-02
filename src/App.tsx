import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<Home />} />
        <Route path="*" element={<Home />} /> {/* For handling 404 */}
      </Routes>
    </Router>
  );
}

export default App;

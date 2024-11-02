import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import UserDetails from "./UserDetails";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="*" element={<NotFoundPage />} /> {/* For handling 404 */}
      </Routes>
    </Router>
  );
}

export default App;

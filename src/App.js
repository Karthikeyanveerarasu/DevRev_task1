import Load from "./loader/Load";
import "./styles.css";
import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./user/Login";
import Signup from "./user/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./Book/Book";
import About from "./Home/About";
import Contact from "./Home/Contact";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />

          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

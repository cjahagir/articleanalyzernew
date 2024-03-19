import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar.mjs';
import About from './components/About.mjs';
import Connectus from './components/Connectus.mjs';
import Textanalyzer from './components/Textanalyzer.mjs';

export default function App() {
  return (
    <>
      <Router>
        <Navbar title="Article Analyzer" about="About" connectus="Connect with us" />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/connectus" element={<Connectus />} />
          <Route path="/" element={<Textanalyzer/>} />
        </Routes>
      </Router>
    </>
  );
}

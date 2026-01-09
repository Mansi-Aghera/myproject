import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Donations from './pages/Donations';
import Events from './pages/Events';
import Contact from './pages/Contact';

function App() {
 return (
    <div className="d-flex min-vh-100 app-layout">
      <Sidebar />

      <div className="content flex-grow-1 app-main">
        <Navbar />

        <div className="container-fluid mt-4 p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </div>
  );

}

export default App;

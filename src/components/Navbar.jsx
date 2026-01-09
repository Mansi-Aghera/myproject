import React from 'react';
import "../App.css"


const Navbar = () => {
  return (
    <nav className="top-navbar d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Admin Panel</h5>
      <button className="btn btn-danger">Logout</button>
    </nav>
  );
};

export default Navbar;

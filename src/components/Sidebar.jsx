// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import "../App.css";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h4>Admin Panel</h4>
//       <ul className="nav flex-column mt-4">

//         <NavLink to="/" className="nav-link">
//           <li className="nav-item">📊 Dashboard</li>
//         </NavLink>

//         <NavLink to="/categories" className="nav-link">
//           <li className="nav-item">👤 Categories</li>
//         </NavLink>

//         <NavLink to="/donations" className="nav-link">
//           <li className="nav-item">⚙️ Donation</li>
//         </NavLink>

//         <NavLink to="/events" className="nav-link">
//           <li className="nav-item">📦 Events</li>
//         </NavLink>

//         <NavLink to="/contact" className="nav-link">
//           <li className="nav-item">📦 Contact</li>
//         </NavLink>

//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4>Admin Panel</h4>
      <ul className="nav flex-column mt-4">

        <NavLink to="/" className="nav-link">
          <li className="nav-item">📊 Dashboard</li>
        </NavLink>

        <NavLink to="/categories" className="nav-link">
          <li className="nav-item">📂 Categories</li>
        </NavLink>

        <NavLink to="/donations" className="nav-link">
          <li className="nav-item">💝 Donations</li>
        </NavLink>

        <NavLink to="/events" className="nav-link">
          <li className="nav-item">📅 Events</li>
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          <li className="nav-item">📨 Contact</li>
        </NavLink>

      </ul>
    </div>
  );
};

export default Sidebar;

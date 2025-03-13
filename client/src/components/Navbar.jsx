import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const location = useLocation();



  return (
    <nav className="bg-white shadow-md p-4">
    <ul className="flex items-center justify-end">
      {isAuthenticated && (
        <li>
          <NavLink
            to="/"
            style={{ fontSize: "15px", marginLeft: "30px" }}
            className={({ isActive }) =>
              `font-bold px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600 text-white" : "text-black hover:text-blue-600"
              }`
            }
            onClick={() => logout()}
          >
            Salir
          </NavLink>
        </li>
      )}
    </ul>
  </nav>
);
}

export default Navbar;

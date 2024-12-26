import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    Cookies.remove("currentUser");
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md z-50 relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
          <Link to="/" className="text-2xl font-bold ml-4">
            Hair Luxe
          </Link>
        </div>
        <ul
          className={`md:flex md:items-center md:space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block px-4 py-2 hover:bg-blue-700 rounded-md"
            >
              Home
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="block px-4 py-2 hover:bg-blue-700 rounded-md"
                >
                  Bienvenido, {currentUser.name}
                </button>
                {userMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                    <li>
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="block px-4 py-2 hover:bg-blue-700 rounded-md"
                      >
                        Ver Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-appointments"
                        onClick={closeMenu}
                        className="block px-4 py-2 hover:bg-blue-700 rounded-md"
                      >
                        Mis Turnos
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-blue-700 rounded-md w-full text-left"
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block px-4 py-2 hover:bg-blue-700 rounded-md"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

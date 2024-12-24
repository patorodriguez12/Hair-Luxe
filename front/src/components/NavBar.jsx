import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    if (user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold">
          Hair Luxe
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="relative group">
              <button className="hover:text-gray-300">
                {user?.name || "Usuario"}
              </button>
              {/* Menú desplegable */}
              <ul className="absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg mt-0 py-2 w-40">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Ver Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Mis Turnos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Iniciar sesion
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="relative md:hidden">
          <div
            className={`absolute top-16 right-0 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-y-0" : "-translate-y-8"
            }`}
            onClick={closeMenu}
          >
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <a href="/" className="block hover:text-blue-600">
                  Home
                </a>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link
                    to="/profile"
                    className="block hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    Ver Perfil
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    Mis Turnos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block hover:text-blue-600 text-left w-full"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    Iniciar Sesión
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

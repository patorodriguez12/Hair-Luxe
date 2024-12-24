import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <a href="/" className="text-lg font-bold">
          MyApp
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-gray-300">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
          {isAuthenticated ? (
            <li>
              <a href="#mis-turnos" className="hover:text-gray-300">
                Mis Turnos
              </a>
            </li>
          ) : (
            <li>
              <a href="/register" className="hover:text-gray-300">
                Registrarse
              </a>
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
                <a href="#home" className="block hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="block hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#contact" className="block hover:text-blue-600">
                  Contact
                </a>
              </li>
              {isAuthenticated ? (
                <li>
                  <a href="#mis-turnos" className="block hover:text-blue-600">
                    Mis Turnos
                  </a>
                </li>
              ) : (
                <li>
                  <a href="/register" className="block hover:text-blue-600">
                    Registrarse
                  </a>
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

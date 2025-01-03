import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { FaScissors } from "react-icons/fa6";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import NavBarMenu from "./NavBarMenu";
import NavBarUserMenu from "./NavBarUserMenu";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    Cookies.remove("currentUser");
    Cookies.remove("token");
    navigate("/login");
  };

  const handleScrollToServices = () => {
    const serviceSection = document.getElementById("service-section");
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <nav className="bg-primary shadow-md">
          <div className="container flex justify-between items-center py-6 ">
            {/* Logo section */}
            <div className="text-2xl flex items-center gap-2 font-bold">
              <Link to="/">
                <FaScissors className="text-3xl text-quaternary" />
              </Link>
              <Link to="/" className="text-3xl">
                HairLuxe
              </Link>
            </div>

            {/* Menu Section */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-6">
                <li>
                  <button
                    className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-4 hover:text-quaternary transition-all duration-300 font-semibold"
                    onClick={handleScrollToServices}
                  >
                    Nuestros servicios
                  </button>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-4 hover:text-quaternary transition-all duration-300 font-semibold"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-4 hover:text-quaternary transition-all duration-300 font-semibold"
                  >
                    Contactanos
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA button section */}
            {currentUser ? (
              <div className="hidden lg:block relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleUserMenu}
                >
                  <FaUserCircle className="text-3xl text-quaternary" />
                  <span>{currentUser.forename}</span>
                  <FaChevronDown
                    className={`text-quaternary transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <NavBarUserMenu isOpen={menuOpen} handleLogout={handleLogout} />
              </div>
            ) : (
              <div className="hidden lg:block space-x-6">
                <Link to="/login" className="font-semibold">
                  Iniciar sesion
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-tertiary font-semibold rounded-full px-6 py-2"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile menu section */}
            <div className="lg:hidden flex items-center" onClick={toggleMenu}>
              <MdMenu className="text-4xl"></MdMenu>
            </div>
          </div>
        </nav>

        {/* Mobile sidebar section */}
        <NavBarMenu isOpen={isOpen} closeMenu={closeMenu} handleLogout={handleLogout} />
      </motion.div>
    </>
  );
};

export default NavBar;

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const NavBarMenu = ({ isOpen, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-tertiary text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <Link to="/schedule">Nuestros servicios</Link>
              </li>
              <li>
                <Link to="/about">Nosotros</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              {currentUser && (
                <>
                  <hr className="w-3/4 border-t border-gray-500" />
                  <li>
                    <Link to="/profile">Mi Perfil</Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

NavBarMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavBarMenu;

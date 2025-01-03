import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const NavBarUserMenu = ({ isOpen, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-2 z-20"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:text-quaternary"
          >
            Mi Perfil
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-gray-800 hover:text-quaternary"
            >
              Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:text-red-500"
          >
            Cerrar Sesión
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

NavBarUserMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavBarUserMenu;

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import ConfirmationModal from "../Confirmation/ConfirmationModal";

const NavBarUserMenu = ({ isOpen, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.role === "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-2 w-48 bg-secondary text-l font-semibold uppercase rounded-md shadow-lg py-2 z-20"
        >
          <ul className="flex flex-col justify-center items-center gap-2">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-600 hover:text-quaternary"
              >
                Mi Perfil
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-gray-600 hover:text-quaternary"
                >
                  Admin
                </Link>
              </li>
            )}
            <hr className="w-3/4 border-t border-gray-500" />
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-red-500"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleLogout}
            message="¿Estás seguro que quieres cerrar sesión?"
            title="Cerrar sesión"
          />
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

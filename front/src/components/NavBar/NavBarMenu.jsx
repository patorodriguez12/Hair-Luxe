import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import ConfirmationModal from "../Confirmation/ConfirmationModal";

const NavBarMenu = ({ isOpen, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.role === "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="text-xl font-semibold uppercase bg-secondary text-gray-600 py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <Link to="/">Nuestros servicios</Link>
              </li>
              <li>
                <Link to="/schedule">Agenda un turno</Link>
              </li>
              {/* <li>
                <Link to="/contact">Contacto</Link>
              </li> */}
              {currentUser && (
                <>
                  <hr className="w-3/4 border-t border-gray-500" />
                  <li>
                    <Link to="/profile">Mi Perfil</Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link to="/create-service">Crear servicio</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={() => setIsModalOpen(true)}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
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

NavBarMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavBarMenu;

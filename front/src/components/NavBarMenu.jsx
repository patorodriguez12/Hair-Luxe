import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBarMenu = ({ isOpen }) => {
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
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

NavBarMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default NavBarMenu;

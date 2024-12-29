import { useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const NavBarBanner = () => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(true);
  return (
    isOpen && (
      <motion.div
        className="bg-tertiary text-sm text-center font-semibold p-1 hidden lg:block relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {currentUser
          ? `Bienvenido nuevamente ${currentUser.forename} ${currentUser.surname}, recuerda que puedes ver tus turnos en la seccion Mi Perfil`
          : "Te cuesta confiar en nuevos estilistas? Te cuesta confiar en nuevos estilistas? En Hair Luxe contamos con especialistas altamente capacitados para brindarte el mejor servicio."}
        <div
          className="absolute top-1 right-10 cursor-pointer -transate-y-1/2"
          onClick={() => setIsOpen(false)}
        >
          X
        </div>
      </motion.div>
    )
  );
};

export default NavBarBanner;

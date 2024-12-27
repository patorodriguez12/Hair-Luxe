import { useState } from "react";
import { motion } from "framer-motion";

const NavBarBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    isOpen && (
      <motion.div
        className="bg-tertiary text-sm text-center font-semibold p-1 hidden lg:block relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Te cuesta confiar en nuevos estilistas? En Hair Luxe contamos con un
        equipo de profesionales altamente capacitados para brindarte un servicio
        de calidad.
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

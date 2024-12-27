import HeroImg from "../assets/HeroImg.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideRight } from "./animation";

const Hero = () => {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Page info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              className="text-tertiary uppercase font-semibold"
              variants={SlideRight(0.2)}
              initial="hidden"
              animate="visible"
            >
              Encuentra tu nuevo yo
            </motion.p>
            <motion.h1
              className="text-quinary text-5xl font-bold lg:text-6xl !leading-tight"
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
            >
              Bienvenido a <span className="text-quaternary">Hair Luxe</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
            >
              Donde encontraras el estilo que buscas, de la mano de los mejores
              estilistas
            </motion.p>

            {/* button section */}
            <motion.div
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="/schedule"
                className="bg-secondary font-semibold px-3 py-3 rounded-full hover:!scale-110 hover:!shadow-xl duration-300"
              >
                Reserva ahora
              </Link>
              <Link
                to="/"
                className="flex justify-end items-center gap-2 font-semibold "
              >
                <span className="w-10 h-10 bg-secondary/15 rounded-full flex justify-center items-center">
                  <FaArrowRight className="text-secondary" />
                </span>
                Nuestros servicios
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            src={HeroImg}
            alt="barber items default image"
            className="w-[350px] md:w-[550px] xl:w-[700px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;

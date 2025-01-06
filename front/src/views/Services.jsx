import { useContext } from "react";
import { motion } from "framer-motion";
import { ServicesContext } from "../context/ServicesContext";
import { SlideLeft } from "../utils/animation";
import { Link } from "react-router-dom";

const Services = () => {
  const { services } = useContext(ServicesContext);

  return (
    <div className="bg-[#f9fafc]" id="service-section">
      <div className="container py-24">
        {/* Header Section */}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-8">
          <h1 className="uppercase font-semibold text-orange-600">
            Explora nuestros servicios
          </h1>
          <p className="font-semibold text-3xl">
            Elige el que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow flex flex-col justify-between items-center"
              initial="hidden"
              animate="visible"
              variants={SlideLeft}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-gray-800 font-semibold mt-4">
                ${service.price}
              </p>
              <Link
                to="/schedule"
                className="mt-4 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-quaternary transition-all"
              >
                Solicitar
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

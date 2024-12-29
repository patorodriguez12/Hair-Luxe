import { useContext } from "react";
import { motion } from "framer-motion";
import { ServicesContext } from "../../context/ServicesContext";
import { SlideLeft } from "../../utils/animation";

const ServiceHome = () => {
  const { services } = useContext(ServicesContext);
  return (
    <div className="bg-[#f9fafc]" id="service-section">
      <div className="container py-24">
        {/* header section */}
        <div>
          <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
            <h1 className="uppercase font-semibold text-orange-600">
              Explora nuestros servicios
            </h1>
            <p className="font-semibold text-3xl">
              Elige el que mejor se adapte a tus necesidades
            </p>
          </div>
        </div>

        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => {
            return (
              <motion.div
                variants={SlideLeft(0.2)}
                initial="hidden"
                whileInView={"visible"}
                key={service.id}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* image section  */}
                <div className="w-120 h-120 rounded-lg flex justify-center items-center text-white">
                  <img src={service.image} alt={service.name} />
                </div>

                <p className="text-2xl font-semibold">{service.name}</p>
                <p className="text-sm text-gray-500">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceHome;

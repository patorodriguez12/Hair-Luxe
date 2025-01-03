import { useContext } from "react";
import { motion } from "framer-motion";
import { ServicesContext } from "../../context/ServicesContext";
import { SlideLeft } from "../../utils/animation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceHome = () => {
  const { services } = useContext(ServicesContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="p-4">
              <motion.div
                className="bg-white shadow-lg rounded-lg p-6"
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
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ServiceHome;

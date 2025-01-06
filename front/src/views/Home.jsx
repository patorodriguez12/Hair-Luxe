import Hero from "../components/Home/HeroHome";
import ServiceHome from "../components/Home/ServiceHome";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/Home/ScrollToTop";

const Home = () => {
  return (
    <div id="home" className="bg-gray-100 text-gray-800 relative">
      {/* Hero Section */}

      <Hero />

      {/* Services Section */}

      <Link to="/all-services">
        <ServiceHome />
      </Link>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Lo que Dicen Nuestros Clientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                ¡El mejor servicio que he recibido! Definitivamente volveré.
              </p>
              <h4 className="text-lg font-bold mt-4">- Juan Pérez</h4>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                Un equipo profesional que realmente se preocupa por sus
                clientes.
              </p>
              <h4 className="text-lg font-bold mt-4">- María López</h4>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                ¡Mi nuevo lugar favorito para cortarme el cabello!
              </p>
              <h4 className="text-lg font-bold mt-4">- Carlos Gómez</h4>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Home;

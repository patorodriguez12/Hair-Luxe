import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div id="home" className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Corte de Cabello"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Corte de Cabello</h3>
                <p className="text-gray-600">
                  Estilos modernos y clásicos adaptados a tu personalidad.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Tintes y Coloración"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tintes y Coloración</h3>
                <p className="text-gray-600">
                  Transforma tu look con colores vibrantes y duraderos.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Peinados y Estilismo"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Peinados y Estilismo</h3>
                <p className="text-gray-600">
                  Perfecto para eventos especiales o simplemente para lucir
                  increíble.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Home;

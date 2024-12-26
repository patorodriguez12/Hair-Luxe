import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppointmentDetail = ({ handleOnClose, id }) => {
  const { currentUser } = useContext(AuthContext);
  const appointments = currentUser.appointments.find((appointment) => appointment.id === id);
  const service = appointments.service;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6">
        {/* Closing button */}
        <button
          onClick={handleOnClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Detalle del Turno</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Servicio</h3>
          <p className="text-gray-700">{service.name}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Precio</h3>
          <p className="text-gray-700">${service.price}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Fecha</h3>
          <p className="text-gray-700">{new Date(appointments.date).toLocaleString()}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleOnClose}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

AppointmentDetail.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default AppointmentDetail;

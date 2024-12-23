import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AppointmentDetail = ({ handleOnClose, id }) => {
  const [appointment, setAppointment] = useState(null);
  const URL = "http://localhost:3000/appointments";

  useEffect(() => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => setAppointment(response.data))
      .catch((error) => console.error("Error fetching appointment:", error));
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  console.log(appointment.user.name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
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
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Detalles del Turno
          </h2>

          {/* Appointment Info */}
          <div className="mb-6">
            <p className="text-lg mb-2">
              <strong className="text-gray-700">📅 Fecha:</strong>{" "}
              {appointment.date}
            </p>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">⏰ Hora:</strong>{" "}
              {appointment.time}
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Estado:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  appointment.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appointment.status === "active" ? "Activo" : "Pendiente"}
              </span>
            </p>
          </div>

          {/* User info */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Información del Usuario
            </h3>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Nombre:</strong>{" "}
              {appointment.user.name}
            </p>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Email:</strong>{" "}
              {appointment.user.email}
            </p>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Fecha de Nacimiento:</strong>{" "}
              {appointment.user.birthdate}
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">DNI:</strong>{" "}
              {appointment.user.nDni}
            </p>
          </div>
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

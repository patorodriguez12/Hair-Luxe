import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const AppointmentDetail = ({ handleOnClose, id }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const appointment = currentUser.appointments.find(
    (appointment) => appointment.id === id
  );
  const service = appointment.service;

  const handleCancelAppointment = async () => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de que deseas cancelar este turno?"
    );
    if (!confirmCancel) return;

    try {
      const token = Cookies.get("token");
      await axios.put(
        `/appointments/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the currentUser state to reflect the cancelled appointment
      const updatedAppointments = currentUser.appointments.map((appt) =>
        appt.id === id ? { ...appt, status: "cancelled" } : appt
      );
      setCurrentUser({ ...currentUser, appointments: updatedAppointments });

      handleOnClose();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Error al cancelar el turno. Por favor, inténtalo de nuevo.");
    }
  };

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

        {/* Appointment details */}
        <h2 className="text-2xl font-semibold mb-4">Detalles del Turno</h2>
        <p>
          <strong>Servicio:</strong> {service.name}
        </p>
        <p>
          <strong>Descripción:</strong> {service.description}
        </p>
        <p>
          <strong>Fecha:</strong> {appointment.date}
        </p>
        <p>
          <strong>Hora:</strong> {appointment.time}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          {appointment.status === "active" ? "Activo" : "Cancelado"}
        </p>

        {/* Cancel appointment button */}
        {appointment.status === "active" && (
          <button
            onClick={handleCancelAppointment}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Cancelar Turno
          </button>
        )}
      </div>
    </div>
  );
};

AppointmentDetail.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default AppointmentDetail;

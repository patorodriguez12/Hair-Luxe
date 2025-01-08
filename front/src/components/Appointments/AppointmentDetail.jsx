import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import ConfirmationModal from "../Confirmation/ConfirmationModal";

const AppointmentDetail = ({ handleOnClose, id }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointment = currentUser.appointments.find(
    (appointment) => appointment.id === id
  );
  const service = appointment.service;

  const handleCancelAppointment = async () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6">
        {/* Closing button */}
        <button
          onClick={handleOnClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:scale-125 duration-300 transition-all"
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
        <div className="mb-4">
          <h2 className="text-quaternary text-2xl font-semibold mb-4">
            Detalles del Turno
          </h2>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Servicio:</span>
            <span>{service.name}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Fecha:</span>
            <span>{appointment.date}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Hora:</span>
            <span>{appointment.time}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Estado:</span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                appointment.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {appointment.status === "active" ? "Activo" : "Cancelado"}
            </span>
          </div>
        </div>
        <hr className="w-full border-t border-gray-500 p-4" />

        {/* Service description */}
        <div className="mb-4">
          <h2 className="text-quaternary text-2xl font-semibold mb-4">
            Descripción del Servicio
          </h2>
          <p>{service.description}</p>
        </div>

        <hr className="w-full border-t border-gray-500 p-4" />
        {/* User info */}
        <div className="mb-4">
          <h2 className="text-quaternary text-2xl font-semibold mb-4">
            Información del Usuario
          </h2>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Nombre:</span>
            <span>{currentUser.forename}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Apellido:</span>
            <span>{currentUser.surname}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Email:</span>
            <span>{currentUser.email}</span>
          </div>
        </div>

        {/* Cancel appointment button */}
        {appointment.status === "active" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full py-2 bg-red-300 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Cancelar Turno
          </button>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelAppointment}
        message="¿Estás seguro que quieres cancelar este turno?"
        title="Cancelar turno"
      />
    </motion.div>
  );
};

export default AppointmentDetail;

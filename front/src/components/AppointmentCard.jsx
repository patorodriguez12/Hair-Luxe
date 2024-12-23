import React from "react";

const AppointmentCard = ({ appointment, handleOnClick }) => {
  const { date, time, status, id } = appointment;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-500 hover:shadow-xl transition-all">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          📅 {appointment.date}
        </h2>
        <p className="text-lg text-gray-600">⏰ {appointment.time}</p>
      </div>
      <div
        className={`px-3 py-1 text-sm font-medium rounded-full w-fit ${
          appointment.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {appointment.status === "active" ? "Activo" : "Pendiente"}
      </div>
      <button
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        onClick={() => handleOnClick(appointment.id)}
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default AppointmentCard;

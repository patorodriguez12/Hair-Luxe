const AppointmentCard = ({ appointment, handleOnClick }) => {
  return (
    <div
      className={`${
        appointment.status === "active" ? "bg-white" : "bg-red-50"
      } shadow-md rounded-lg p-6 border-l-4 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border-primary`}
    >
      {/* Service Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
         ✂ {appointment.service.name}
        </h3>
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

      {/* Details Section */}
      <div className="mb-4 text-gray-600">
        <div className="flex justify-between">
          <span className="font-semibold">Fecha:</span>
          <span>{appointment.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Hora:</span>
          <span>{appointment.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Turno numero:</span>
          <span>{appointment.service.id}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full py-2 bg-secondary text-white rounded-lg hover:bg-quaternary transition-all font-medium"
        onClick={() => handleOnClick(appointment.id)}
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default AppointmentCard;

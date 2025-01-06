import PropTypes from "prop-types";

const AppointmentCard = ({ appointment, handleOnClick }) => {
  return (
    <div className={`${appointment.status === "active" ? "bg-white" : "bg-red-100"} shadow-md rounded-lg p-6 border-l-4 hover:!scale-[1.02] hover:!shadow-xl duration-300 transition-all border-primary`}>
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center mb-4" >
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          📅 {appointment.date}
        </h2>
        <hr className="w-3/4 border-t border-gray-500" />
        <p className="text-md font-semibold text-gray-700">
          ⏰ {appointment.time}
        </p>
      </div>

      {/* Status Badge */}
      <div
        className={`px-4 py-1 text-sm font-semibold rounded-full w-fit ${
          appointment.status === "active"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {appointment.status === "active" ? "Activo" : "Cancelado"}
      </div>

      {/* Action Button */}
      <button
        className="mt-4 w-full py-2 bg-tertiary text-white rounded-md hover:bg-quaternary transition-all font-medium"
        onClick={() => handleOnClick(appointment.id)}
      >
        Ver Detalles
      </button>
    </div>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default AppointmentCard;

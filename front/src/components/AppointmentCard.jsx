import React from "react";

const AppointmentCard = ({ appointment, handleOnClick }) => {
  const { date, time, status, id } = appointment;

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border-t-4 transition-all hover:shadow-lg 
                    border-blue-500"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">📅 {date}</h2>
        <h3 className="text-lg text-gray-600">⏰ {time}</h3>
      </div>
      <div
        className={`px-3 py-1 text-sm font-medium rounded-full w-fit ${
          status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status}
      </div>
      <button
        onClick={() => {
          handleOnClick(id);
        }}
      >
        Ver más
      </button>
    </div>
  );
};

export default AppointmentCard;

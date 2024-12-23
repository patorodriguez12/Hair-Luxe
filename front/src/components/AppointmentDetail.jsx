import { useState, useEffect } from "react";

const AppointmentDetail = ({ handleOnClose, id }) => {
  const [appointment, setAppointment] = useState(null);
  const URL = "/appointments";

  useEffect(() => {
    fetch(`${URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setAppointment(data));
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const { date, time, status, user } = appointment;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <button
        onClick={handleOnClose}
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
      >
        X
      </button>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
        <h2 className="text-lg font-semibold mb-4">Detalles del Turno</h2>
        <p>
          <strong>📅 Fecha:</strong> {date}
        </p>
        <p>
          <strong>⏰ Hora:</strong> {time}
        </p>
        <p>
          <strong>Estado:</strong> {status}
        </p>
        <h3 className="text-md font-bold mt-4">Información del Usuario</h3>
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Fecha de Nacimiento:</strong> {user.birthdate}
        </p>
        <p>
          <strong>DNI:</strong> {user.nDni}
        </p>
      </div>
    </div>
  );
};

export default AppointmentDetail;

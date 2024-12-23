import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentDetail from "../components/AppointmentDetail";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(null);
  const URL = "/appointments";

  const handleOnClick = (appointmentId) => {
    setId(appointmentId);
    setDetail(true);
  };

  const handleOnClose = () => {
    setDetail(false);
  };

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div
      id="home"
      className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 py-12 min-h-screen"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-700">
          Mis Turnos
        </h1>

        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                handleOnClick={handleOnClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">No tienes turnos agendados.</p>
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => alert("Agendar un turno")} // Ajusta según tu lógica
            >
              Agendar un Turno
            </button>
          </div>
        )}

        {detail && <AppointmentDetail handleOnClose={handleOnClose} id={id} />}
      </div>
    </div>
  );
};

export default MyAppointments;

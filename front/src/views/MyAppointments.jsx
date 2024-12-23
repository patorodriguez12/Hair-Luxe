import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentDetail from "../components/AppointmentDetail";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(null);
  const URL = "http://localhost:3000/appointments";

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
    <div id="home" className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">MIS TURNOS</h1>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            handleOnClick={handleOnClick}
          />
        ))}
      </div>
      {detail && <AppointmentDetail handleOnClose={handleOnClose} id={id} />}
    </div>
  );
};

export default MyAppointments;

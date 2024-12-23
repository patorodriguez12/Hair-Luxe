import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentDetail from "../components/AppointmentDetail";

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
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setAppointments(data));
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

import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const URL = "/appointments";

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
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;

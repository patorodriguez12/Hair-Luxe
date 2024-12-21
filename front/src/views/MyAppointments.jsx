import { useState } from "react";
import {myAppointments} from "../helpers/myAppointments";
import AppointmentCard from "../components/AppointmentCard";

function MyAppointments() {
  const [appointments, setAppointments] = useState(myAppointments);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div id="home" className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">MIS TURNOS</h1>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
        <button onClick={() => addAppointment({})}>Agendar nuevo turno</button>
      </div>
    </div>
  );
}

export default MyAppointments;

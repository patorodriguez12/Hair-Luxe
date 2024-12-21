import AppointmentCard from "../components/AppointmentCard";
import { myAppointments } from "../helpers/myAppointments";
import { useState } from "react";

const Home = () => {
  const [appointments, setAppointments] = useState(myAppointments);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div id="home" className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
        <button onClick={() => addAppointment({})}>Add appointment</button>
      </div>
    </div>
  );
};

export default Home;

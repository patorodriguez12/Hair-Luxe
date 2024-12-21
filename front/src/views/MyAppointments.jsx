import { useState } from "react";
import myAppointments from "../helpers/myAppointments";
import AppointmentCard from "../components/AppointmentCard";

function MyAppointments() {
  const [appointments, setAppointments] = useState(myAppointments);

  return (
    <div>
      <h1>My Appointments</h1>
    </div>
  );
}

export default MyAppointments;

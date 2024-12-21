function AppointmentCard({ appointment: { date, time, status } }) {
  return (
    <div>
      <h2>{date}</h2>
      <h2>{time}</h2>
      <h2>{status}</h2>
    </div>
  );
}


export default AppointmentCard;

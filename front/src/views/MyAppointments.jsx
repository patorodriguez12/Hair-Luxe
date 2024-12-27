import { useContext, useState, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentDetail from "../components/AppointmentDetail";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const MyAppointments = () => {
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`/users/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user appointments:", err);
        setError("Error al cargar los turnos.");
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, [setCurrentUser, currentUser.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const appointments = currentUser.appointments;

  const handleOnClick = (appointmentId) => {
    setId(appointmentId);
    setDetail(true);
  };

  const handleOnClose = () => {
    setDetail(false);
  };

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
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <Link
                to="/schedule"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Agendar un Turno
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">No tienes turnos agendados.</p>
            <Link
              to="/schedule"
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Agendar un Turno
            </Link>
          </div>
        )}

        {detail && <AppointmentDetail handleOnClose={handleOnClose} id={id} />}
      </div>
    </div>
  );
};

export default MyAppointments;

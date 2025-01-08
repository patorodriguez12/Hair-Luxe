import { useContext, useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetail from "./AppointmentDetail";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const MyAppointments = () => {
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;

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

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(appointments.length / appointmentsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-full bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-6 ">
        {appointments.length > 0 ? (
          <>
            {/* Appointment Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  handleOnClick={handleOnClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <nav>
                {pageNumbers.length > 1 && (
                  <ul className="flex list-none items-center">
                    {/* Botón de retroceso */}
                    <li className="mx-1">
                      <button
                        onClick={() =>
                          currentPage > 1 && paginate(currentPage - 1)
                        }
                        className={`px-3 py-1 rounded-lg transition-all ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white"
                        }`}
                        disabled={currentPage === 1}
                      >
                        &#8592;
                      </button>
                    </li>

                    {/* Números de página */}
                    {pageNumbers.map((number) => (
                      <li key={number} className="mx-1">
                        <button
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 rounded-lg transition-all ${
                            currentPage === number
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white"
                          }`}
                        >
                          {number}
                        </button>
                      </li>
                    ))}

                    {/* Botón de avance */}
                    <li className="mx-1">
                      <button
                        onClick={() =>
                          currentPage < pageNumbers.length &&
                          paginate(currentPage + 1)
                        }
                        className={`px-3 py-1 rounded-lg transition-all ${
                          currentPage === pageNumbers.length
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white"
                        }`}
                        disabled={currentPage === pageNumbers.length}
                      >
                        &#8594;
                      </button>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
            <div className="text-center">
              {pageNumbers.length > 1 && (
                <p className="text-sm mt-2">
                  Página {currentPage} de {pageNumbers.length}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-semibold mb-4">
              No tienes turnos agendados.
            </p>
            <Link
              to="/schedule"
              className="inline-block mt-6 px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-quaternary transition-all"
            >
              Agendar un Turno
            </Link>
          </div>
        )}

        {/* Appointment Detail Overlay */}
        {detail && <AppointmentDetail handleOnClose={handleOnClose} id={id} />}
      </div>
    </div>
  );
};

export default MyAppointments;

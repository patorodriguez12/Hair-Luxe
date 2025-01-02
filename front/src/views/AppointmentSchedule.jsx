import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AppointmentsContext } from "../context/AppointmentsContext";
import { AuthContext } from "../context/AuthContext";
import { ServicesContext } from "../context/ServicesContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AppointmentSchedule = () => {
  const navigate = useNavigate();
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { currentUser } = useContext(AuthContext);
  const { services } = useContext(ServicesContext);
  const [error, setError] = useState(null);

  console.log(services);

  const today = new Date().toISOString().split("T")[0];

  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Servicio requerido"),
    date: Yup.date()
      .required("Fecha requerida")
      .test(
        "no-sundays",
        "Lo sentimos, los dias de servicio son de lunes a sabado",
        (value) => {
          const day = new Date(value).getDay();
          return day !== 0;
        }
      ),
    time: Yup.string().required("Hora requerida"),
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Error al cargar los turnos.");
      }
    };

    fetchAppointments();
  }, [setAppointments]);

  const handleSubmit = async (values, { resetForm }) => {
    const token = Cookies.get("token");

    try {
      await axios.post(
        "/appointments/schedule",
        {
          userId: currentUser.id,
          serviceId: values.service,
          date: values.date,
          time: values.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resetForm();
      toast.success("Turno agendado correctamente", {
        position: "bottom-left",
      });
      navigate("/profile");
    } catch (error) {
      const errorMessage = error.response?.data.error || "Error de servidor";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    }
  };

  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(
      (appointment) =>
        appointment.date === date &&
        appointment.time === time &&
        appointment.status === "active"
    );
  };

  const morningSlots = ["08:00", "09:00", "10:00", "11:00"];
  const eveningSlots = ["16:00", "17:00", "18:00", "19:00", "20:00"];

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-quaternary">
        Agendar Turno
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Instructions */}
        <div className="bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido</h2>
          <p className="mb-4">
            Aquí puedes agendar tu turno fácilmente. Sigue las instrucciones a
            continuación para completar el proceso.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Selecciona un servicio.</li>
            <li>Elige una fecha disponible.</li>
            <li>Selecciona una hora de tu preferencia.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Horarios</h3>
          <p className="mb-4">De Lunes a Sabado</p>
          <ul className="list-disc list-inside mb-4">
            <li>Turno Manana: 8:00 AM a 12:00 AM</li>
            <li>Turno Tarde: 16:00 PM a 20:00 PM</li>
          </ul>
        </div>

        {/* Right Section - Form */}
        <div>
          <Formik
            initialValues={{ service: "", date: "", time: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Select service field  */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="service"
                  >
                    Servicio
                  </label>
                  <Field
                    as="select"
                    name="service"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Seleccione un servicio</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="service"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Select date field  */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Fecha
                  </label>
                  <Field
                    type="date"
                    name="date"
                    min={today}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Select time field  */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="time"
                  >
                    Hora
                  </label>
                  <Field
                    as="select"
                    name="time"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Seleccione una hora</option>
                    <optgroup label="Turno mañana">
                      {morningSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          disabled={!isTimeSlotAvailable(values.date, slot)}
                        >
                          {slot}{" "}
                          {isTimeSlotAvailable(values.date, slot)
                            ? ""
                            : "(Ocupado)"}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Turno tarde">
                      {eveningSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          disabled={!isTimeSlotAvailable(values.date, slot)}
                        >
                          {slot}{" "}
                          {isTimeSlotAvailable(values.date, slot)
                            ? ""
                            : "(Ocupado)"}
                        </option>
                      ))}
                    </optgroup>
                  </Field>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-xs italic mb-4">
                    {error}
                  </div>
                )}

                {/* Submit button  */}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-quaternary hover:bg-quaternary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isSubmitting ? "Agendando..." : "Agendar Turno"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;

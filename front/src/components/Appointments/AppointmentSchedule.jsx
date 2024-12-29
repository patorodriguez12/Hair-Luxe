import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AppointmentsContext } from "../../context/AppointmentsContext";
import { AuthContext } from "../../context/AuthContext";
import { ServicesContext } from "../../context/ServicesContext";
import Cookies from "js-cookie";

const AppointmentSchedule = () => {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { currentUser } = useContext(AuthContext);
  const { services } = useContext(ServicesContext);
  const [error, setError] = useState(null);

  console.log(services);

  const today = new Date().toISOString().split("T")[0];

  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Servicio requerido"),
    date: Yup.date().required("Fecha requerida"),
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
      const response = await axios.post(
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

      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error("Error scheduling appointment", error);
      setError("Error al agendar el turno.");
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

  const generateTimeSlots = () => {
    const timeSlots = [];
    const morningSlots = ["08:00", "09:00", "10:00", "11:00"];
    const eveningSlots = ["16:00", "17:00", "18:00", "19:00", "20:00"];

    morningSlots.forEach((slot) => timeSlots.push(slot));
    eveningSlots.forEach((slot) => timeSlots.push(slot));

    return timeSlots;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Agendar Turno</h1>
      <Formik
        initialValues={{ service: "", date: "", time: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                {generateTimeSlots().map((slot) => (
                  <option
                    key={slot}
                    value={slot}
                    disabled={!isTimeSlotAvailable(values.date, slot)}
                  >
                    {slot}{" "}
                    {isTimeSlotAvailable(values.date, slot) ? "" : "(Ocupado)"}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            {error && (
              <div className="text-red-500 text-xs italic mb-4">{error}</div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? "Agendando..." : "Agendar Turno"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentSchedule;

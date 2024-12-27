import { Formik, Form, Field } from "formik";

const ReservationForm = () => {
  const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

  // Horarios permitidos
  const morningSlots = ["08:00", "09:00", "10:00", "11:00", "12:00"];
  const eveningSlots = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

  const validate = (values) => {
    const errors = {};
    const selectedDate = new Date(values.date);
    const day = selectedDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Validar si la fecha es en el pasado
    if (!values.date) {
      errors.date = "Por favor selecciona una fecha.";
    } else if (selectedDate < new Date(today)) {
      errors.date = "No puedes seleccionar un día en el pasado.";
    }

    // Validar si el horario está seleccionado
    if (!values.time) {
      errors.time = "Por favor selecciona una hora.";
    } else if (day === 0 || day === 6) {
      // Fines de semana no permitidos
      errors.time = "Solo puedes reservar turnos de lunes a viernes.";
    }

    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Reserva tu turno
        </h1>

        <Formik
          initialValues={{ date: "", time: "" }}
          validate={validate}
          onSubmit={(values) => {
            console.log("Reserva realizada:", values);
          }}
        >
          {({ values, errors, touched }) => {
            const selectedDate = values.date ? new Date(values.date) : null;
            const isWeekend =
              selectedDate &&
              (selectedDate.getDay() === 0 || selectedDate.getDay() === 6);

            return (
              <Form>
                {/* Campo de Fecha */}
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Fecha
                  </label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min={today} // Restringe fechas anteriores
                  />
                  {errors.date && touched.date && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.date}
                    </div>
                  )}
                </div>

                {/* Campo de Hora */}
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Hora
                  </label>
                  <Field
                    as="select"
                    id="time"
                    name="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!values.date || isWeekend} // Deshabilitar si no hay fecha seleccionada o es fin de semana
                  >
                    <option value="" disabled>
                      Selecciona un horario
                    </option>
                    {/* Mostrar horarios según la fecha seleccionada */}
                    {selectedDate &&
                      selectedDate.getDay() >= 1 &&
                      selectedDate.getDay() <= 5 && (
                        <>
                          <optgroup label="Mañana">
                            {morningSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Tarde">
                            {eveningSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </optgroup>
                        </>
                      )}
                  </Field>
                  {errors.time && touched.time && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.time}
                    </div>
                  )}
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Reservar Turno
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ReservationForm;

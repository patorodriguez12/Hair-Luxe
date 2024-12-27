import { Formik, Form, Field } from "formik";

const AppointmentSchedule = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Reserva tu turno
        </h1>

        {/* Form using Formik */}
        <Formik initialValues={{ date: "", time: "" }} onSubmit={() => {}}>
          <Form>

            {/* Date field */}
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
              />
            </div>

            {/* Time field */}
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-gray-700 font-medium mb-2"
              >
                Hora
              </label>
              <Field
                type="time"
                id="time"
                name="time"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Reservar Turno
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AppointmentSchedule;

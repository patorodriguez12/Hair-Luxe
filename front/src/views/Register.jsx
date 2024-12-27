import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const URL = "/users/register";

  const validationSchema = Yup.object().shape({
    forename: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Correo electrónico requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Contraseña requerida"),
  });

  const handleSubmit = (values) => {
    axios.post(URL, values).then((response) => {
      console.log(response.data);
    });
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Registrarse
        </h1>

        {/* Form using Formik */}
        <Formik
          initialValues={{
            forename: "",
            surname: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount={true}
        >
          {({ isValid }) => (
            <Form>
              {/* Forename field */}
              <div className="mb-4">
                <label
                  htmlFor="forename"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nombre
                </label>
                <Field
                  type="text"
                  id="forename"
                  name="forename"
                  placeholder="Ingresa tu nombre"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="forename"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Surname field */}
              <div className="mb-4">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-600"
                >
                  Apellido
                </label>
                <Field
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Ingresa tu apellido"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Correo electronico
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo electronico"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa una contraseña"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                  isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isValid}
              >
                Registrarse
              </button>
            </Form>
          )}
        </Formik>

        {/* Link to login page */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

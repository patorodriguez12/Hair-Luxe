import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = "/users/login";

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Correo electrónico requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Contraseña requerida"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setErrors("");

    try {
      const response = await axios.post(URL, {
        email: values.email,
        password: values.password,
      });

      if (response.data.login) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/my-appointments";
      } else {
        setErrors("Inicio de sesion fallido");
      }

      resetForm();
    } catch (error) {
      setErrors("Inicio de sesion fallido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar sesión
        </h1>

        {/* Form using Formik */}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount={true}
        >
          {({ isValid }) => (
            <Form>
              {/* Email field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Correo electrónico
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />
              </div>

              {/* Password field */}
              <div className="mb-6">
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
                  placeholder="Ingresa tu contraseña"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>

              {/* Submit button */}
              <button
                className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                  isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isValid}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Register link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

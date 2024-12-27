import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
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

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(URL, {
        email: values.email,
        password: values.password,
      });
      const { user, token } = response.data;
      setCurrentUser(user);
      Cookies.set("token", token, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Image and welcome message */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-white flex-col justify-center items-center p-8">
        <img
          src="https://plus.unsplash.com/premium_photo-1661542350224-8e3f095ce053?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Welcome"
          className="w-80 h-80 object-cover rounded-full"
        />
        <h1 className="text-3xl font-bold mt-4 text-quaternary">Bienvenido a nuestra página</h1>
        <p className="mt-2 text-lg text-quaternary">
          Explora nuestros servicios y disfruta de una experiencia única.
        </p>
      </div>

      {/* Right side: Login form */}
      <div className="flex-1 bg-secondary flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-quaternary text-center mb-6">
            Ingresa a tu cuenta
          </h1>

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
                    className="block text-sm font-medium text-quaternary"
                  >
                    Correo electrónico
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingresa tu correo electrónico"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password field */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-quaternary"
                  >
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit button */}
                <button
                  className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                    isValid
                      ? "bg-tertiary text-white hover:bg-quaternary"
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
          <p className="text-sm text-quaternary mt-4 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-tertiary hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

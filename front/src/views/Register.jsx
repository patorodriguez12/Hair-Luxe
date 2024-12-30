import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const URL = "/users/register";
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(URL, values);
      console.log(response)
      toast.success("Registro realizado con exito, por favor inicia sesion", {
        position: "bottom-left",
      });
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data.error || "Error de servidor";
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="min-h-screen flex flex-col md:flex-row">
        <Link
          to="/"
          className="absolute top-4 left-4 text-quaternary hover:text-quaternary-dark transition-all"
        >
          <FaArrowLeft className="text-2xl" />
        </Link>

        {/* Left side: Image and welcome message */}
        <div className="hidden md:flex md:w-1/2 bg-primary text-white flex-col justify-center items-center p-8">
          <img
            src="https://plus.unsplash.com/premium_photo-1661542350224-8e3f095ce053?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome"
            className="w-80 h-80 object-cover rounded-full"
          />
          <h1 className="text-3xl font-bold mt-4 text-quaternary">
            Bienvenido a HairLuxe
          </h1>
          <p className="mt-2 text-lg text-quaternary">
            Registrate en nuestro sistema para poder agendar tu proximo turno
          </p>
        </div>

        {/* Right side: Register Form */}
        <div className="flex-1 bg-secondary flex justify-center items-center p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-quaternary text-center mb-6">
              Crear cuenta
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
                      className="block text-sm font-medium text-quaternary"
                    >
                      Nombre:{" "}
                    </label>
                    <Field
                      type="text"
                      name="forename"
                      id="forename"
                      placeholder="Ingresa tu nombre"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    <ErrorMessage
                      name="forename"
                      component="p"
                      className="text-red-500 text-sm"
                    />

                    {/* Surname field */}
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-quaternary"
                    >
                      Apellido:{" "}
                    </label>
                    <Field
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Ingresa tu apellido"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    <ErrorMessage
                      name="surname"
                      component="p"
                      className="text-red-500 text-sm"
                    />

                    {/* Email field */}
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-quaternary"
                    >
                      Correo:{" "}
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Ingresa tu correo"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />

                    {/* Password field */}
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-quaternary"
                    >
                      Contraseña:{" "}
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Ingresa tu contraseña"
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
                    {loading ? "Cargando..." : "Registrarse"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Back to login link */}
            <p className="text-sm text-quaternary mt-4 text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-tertiary hover:underline">
                Inicia sesion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;

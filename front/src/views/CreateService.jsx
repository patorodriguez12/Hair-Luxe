import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const CreateService = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(currentUser);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre requerido"),
    description: Yup.string().required("Descripción requerida"),
    price: Yup.number()
      .required("Precio requerido")
      .positive("El precio debe ser positivo"),
    image: Yup.string().required("Imagen requerida"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await axios.post("/services", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Servicio creado exitosamente");
      navigate("/");
    } catch (error) {
      toast.error("Error al crear el servicio");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-quaternary">
        Crear Servicio
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Instructions  */}
        <div className="bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido</h2>
          <p className="mb-4">
            Esta es una seccion exclusiva para administradores, sigue las
            instrucciones a continuacion para añadir un nuevo servicio.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Elige un nombre corto y descriptivo.</li>
            <li>Escribe una descripcion detallada del servicio.</li>
            <li>Ingresa el precio del servicio.</li>
            <li>Ingresa el link de la imagen representativa del servicio.</li>
          </ul>
        </div>

        {/* Right Section - Form */}
        <div>
          <Formik
            initialValues={{ name: "", description: "", price: "", image: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                {/* Name field */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Description field */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Price field */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Precio
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Image field */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Imagen
                  </label>
                  <Field
                    type="text"
                    name="image"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="bg-quaternary hover:bg-quaternary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {loading ? "Creando..." : "Crear Servicio"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateService;

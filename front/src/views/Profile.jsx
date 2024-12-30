import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import MyAppointments from "../components/Appointments/MyAppointments";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="text-center">
          <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-lg font-semibold">Cargando...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 flex flex-col items-center"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-blue-600"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Perfil
      </motion.h1>
      <motion.div
        className="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-md md:max-w-lg lg:max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Información del Usuario
        </h2>
        <div className="space-y-4">
          <p>
            <strong className="text-gray-800">Nombre:</strong>{" "}
            {currentUser.forename}
          </p>
          <p>
            <strong className="text-gray-800">Apellido:</strong>{" "}
            {currentUser.surname}
          </p>
          <p>
            <strong className="text-gray-800">Email:</strong>{" "}
            {currentUser.email}
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mt-8"
      >
        <MyAppointments />
      </motion.div>
    </motion.div>
  );
};

export default Profile;

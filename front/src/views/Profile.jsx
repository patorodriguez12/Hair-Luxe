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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side: User Info */}
        <div className="md:w-1/2 bg-primary text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mt-4 text-quaternary">
            ¡Bienvenido, {currentUser.forename}!
          </h1>
          <p className="mt-2 text-lg text-quaternary">
            Aquí puedes ver y gestionar tus turnos.
          </p>
        </div>

        {/* Right side: Appointments */}
        <div className="md:w-1/2 bg-secondary text-black flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-bold mb-4 text-quaternary">
            Tus Turnos Agendados
          </h2>
          <div className="w-full max-w-lg">
            <MyAppointments />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;

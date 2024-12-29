import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MyAppointments from "../components/Appointments/MyAppointments";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Perfil</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Información del Usuario</h2>
        <p>
          <strong>Nombre:</strong> {currentUser.forename}
        </p>
        <p>
          <strong>Apellido:</strong> {currentUser.surname}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>
      <MyAppointments />
    </div>
  );
};

export default Profile;

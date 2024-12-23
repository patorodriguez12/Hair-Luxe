import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email: ${userData.email}, Password: ${userData.password}`);
    // axios request to login the user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar sesion
        </h1>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo electronico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo electronico"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={userData.email}
              onChange={handleInputChange}
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
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Iniciar sesion
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

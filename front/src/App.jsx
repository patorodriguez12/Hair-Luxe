import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const isRegistered = true;

  if (isRegistered) {
    return (
      <div>
        <h1>Bienvenidos a mi primer app</h1>
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold">
        Bienvenidos a mi primer app
      </h1>
      {isRegistered ? <Login /> : <Register />}
    </div>
  );
}

export default App;

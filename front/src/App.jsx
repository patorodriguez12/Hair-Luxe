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
    <>
      <h1>Bienvenidos a mi primer app</h1>
      {!isRegistered && <Register />}
    </>
  );
}

export default App;

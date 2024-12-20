function Login() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <h2>Login</h2>
      
      <form>
        <label>Nombre: </label>
        <input type="text" />

        <label>Email: </label>
        <input type="text" />

        <label>Contraseña: </label>
        <input type="text" />
      </form>
    </div>
  );
}

export default Login;

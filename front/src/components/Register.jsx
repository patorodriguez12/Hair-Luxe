function Register() {
  return (
    <div>
      <h2>Register</h2>

      <form>
        <label>Nombre: </label>
        <input type="text" />

        <label>Email: </label>
        <input type="text" />

        <label>Contraseña: </label>
        <input type="text" />

        <label>DNI: </label>
        <input type="text" />

        <label>Fecha de nacimiento: </label>
        <input type="date" />
      </form>
    </div>
  );
}

export default Register;

import Home from "./views/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;

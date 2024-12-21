import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;

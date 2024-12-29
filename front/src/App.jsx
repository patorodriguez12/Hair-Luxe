import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import NavBarBanner from "./components/NavBar/NavBarBanner";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AppointmentSchedule from "./components/Appointments/AppointmentSchedule";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";
import AuthRoutes from "./components/ProtectedRoutes/AuthRoutes";
import NotAuthRoutes from "./components/ProtectedRoutes/NotAuthRoutes";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <NavBar />
      )}

      {/* Navbar Banner with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <NavBarBanner />
      )}

      {/* Content */}
      <main className="flex-grow overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* User authenticated routes */}
          <Route
            path="/profile"
            element={
              <AuthRoutes>
                <Profile />
              </AuthRoutes>
            }
          />
          <Route
            path="/schedule"
            element={
              <NotAuthRoutes>
                <AppointmentSchedule />
              </NotAuthRoutes>
            }
          />

          {/* User not authenticated routes */}
          <Route
            path="/login"
            element={
              <NotAuthRoutes>
                <Login />
              </NotAuthRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <NotAuthRoutes>
                <Register />
              </NotAuthRoutes>
            }
          />

          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;

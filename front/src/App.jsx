import { Route, Routes } from "react-router-dom";

// Views imports
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AppointmentSchedule from "./views/AppointmentSchedule";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";
import CreateService from "./views/CreateService";

// Layouts imports
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotAuthLayout from "./layouts/NotAuthLayout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<AppointmentSchedule />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/create-service" element={<CreateService />} />
      </Route>

      {/* Non-authenticated routes */}
      <Route element={<NotAuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

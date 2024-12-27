import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider";
import { AppointmentsProvider } from "./providers/AppointmentsProvider";
import { ServicesProvider } from "./providers/ServicesProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppointmentsProvider>
          <ServicesProvider>
            <ToastContainer />
            <App />
          </ServicesProvider>
        </AppointmentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

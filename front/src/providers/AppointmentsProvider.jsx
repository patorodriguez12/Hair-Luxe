import { useState } from "react";
import PropTypes from "prop-types";
import { AppointmentsContext } from "../context/AppointmentsContext";

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const value = { appointments, setAppointments };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};

AppointmentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

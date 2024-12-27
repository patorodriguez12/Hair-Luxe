import { createContext } from "react";

export const AppointmentsContext = createContext({
  appointments: [],
  setAppointments: () => {},
});

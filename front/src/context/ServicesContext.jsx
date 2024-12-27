import { createContext } from "react";

export const ServicesContext = createContext({
  services: [],
  setServices: () => {},
});

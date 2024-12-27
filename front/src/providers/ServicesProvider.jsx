import { useState } from "react";
import { ServicesContext } from "../context/ServicesContext";
import PropTypes from "prop-types";

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const value = { services, setServices };
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

ServicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

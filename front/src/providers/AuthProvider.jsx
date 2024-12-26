import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = Cookies.get("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      Cookies.set("currentUser", JSON.stringify(currentUser), { expires: 7 });
    } else {
      Cookies.remove("currentUser");
    }
  }, [currentUser]);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

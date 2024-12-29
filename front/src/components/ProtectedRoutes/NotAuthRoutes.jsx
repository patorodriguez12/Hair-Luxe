import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

const NotAuthRoutes = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

NotAuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotAuthRoutes;
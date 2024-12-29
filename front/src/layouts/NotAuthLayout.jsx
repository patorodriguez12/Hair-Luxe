import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NotAuthLayout() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default NotAuthLayout;

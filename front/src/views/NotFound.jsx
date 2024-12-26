import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      navigate("/");
    }, 5000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-gray-600 min-h-[80vh]">
      <h2 className="text-7xl">404</h2>
      <p className="text-2xl">Page not found.</p>
      <p className="text-2xl">Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default NotFound;

import { Outlet, useNavigate } from "react-router";
import Dashboard from "../Dashboard";
import isUserLoggedIn from "../utils/loginChecker";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn(navigate);
  }, []);

  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  );
};

export default PrivateRoute;

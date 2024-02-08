import { Outlet, useLocation } from "react-router";
import PatientsTable from "../components/PatientsTable";

const PatientsPage = () => {
  const location = useLocation();
  const isOperateRoute = location.pathname.startsWith("/Patients/Operate");
  const isDetailsRoute = location.pathname.startsWith("/Patients/Details");

  return (
    <>{isOperateRoute || isDetailsRoute ? <Outlet /> : <PatientsTable />}</>
  );
};

export default PatientsPage;

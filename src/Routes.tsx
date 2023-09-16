import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import App from "./App";
import Dashboard from "./Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import DataTable from "./components/DataTable";
import AddPatient from "./components/PatientForm";
import AddButton from "./components/AddButton";
import AdminProfile from "./components/AdminProfile";
import Errorpage from "./pages/Errorpage";
import DashboardKpiPage from "./pages/DashboardKpiPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "dashboard",
        element: <DashboardKpiPage />,
      },
      {
        path: "Patients",
        element: (
          <>
            <AddButton />
            <DataTable />
          </>
        ),
      },
      {
        path: "AddPatient",
        element: <AddPatient />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
export default router;

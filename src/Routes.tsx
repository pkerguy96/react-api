import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import App from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

import AddPatient from "./pages/AddPatientForm";

import AdminProfile from "./components/AdminProfile";
import Errorpage from "./pages/Errorpage";
import DashboardKpiPage from "./pages/DashboardKpiPage";
import NursesPage from "./pages/NursesPage";
import PatientsPage from "./pages/PatientsPage";

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
        element: <PatientsPage />,
      },
      {
        path: "AddPatient",
        element: <AddPatient />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "sexybebe",
        element: <NursesPage />,
      },
    ],
  },
]);
export default router;

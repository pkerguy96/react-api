import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import App from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

import AddPatient from "./pages/AddPatientForm";

import AdminProfile from "./components/AdminProfile";
import Errorpage from "./pages/Errorpage";
import DashboardKpiPage from "./pages/DashboardKpiPage";

import PatientsPage from "./pages/PatientsPage";
import AddNurseForm from "./pages/AddNurseForm";
import PatientOperation from "./pages/PatientOperation";
import NursePage from "./pages/NursePage";

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
        children: [
          {
            path: "Operate/:id",
            element: <PatientOperation />,
          },
        ],
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
        path: "Nurses",
        element: <NursePage />,
      },
      {
        path: "AddNurse",
        element: <AddNurseForm />,
      },
    ],
  },
]);
export default router;

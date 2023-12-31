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
import PatientDetails from "./pages/PatientDetails";
import AppointmentPage from "./pages/AppointmentPage";
import StockPage from "./pages/StockPage";
import OrdonnancePage from "./pages/OrdonnancePage";
import PrintableComponant from "./components/PrintableComponant";
import AddOrdonance from "./pages/AddOrdonance";
import DicomPageViewer from "./pages/DicomPageViewer";
import ReglementPage from "./pages/ReglementPage";

import PaymentDetailsPage from "./pages/PaymentDetailsPage";
import DicomPage from "./pages/DicomPage";
import AddFile from "./pages/AddFile";

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
        path: "Appointments",
        element: <AppointmentPage />,
      },
      {
        path: "Patients",
        element: <PatientsPage />,
        children: [
          {
            path: "Operate/:id/:age?",
            element: <PatientOperation />,
          },
          {
            path: "Details/:id",
            element: <PatientDetails />,
          },
        ],
      },

      {
        path: "Ordonnance",
        element: <OrdonnancePage />,
      },
      {
        path: "AddOrdonance/:id?/:ordonance?",
        element: <AddOrdonance />,
      },
      {
        path: "AddOrdonance/:id?",
        element: <AddOrdonance />,
      },
      {
        path: "OrdonanceDetails/:id",
        element: <PrintableComponant />,
      },
      {
        path: "AddPatient/:id?",
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
      {
        path: "Files",
        element: <DicomPage />,
      },
      {
        path: "Stock",
        element: <StockPage />,
      },
      {
        path: "Reglement",
        element: <ReglementPage />,
      },
      {
        path: "Addfile",
        element: <AddFile />,
      },
    ],
  },
]);
export default router;

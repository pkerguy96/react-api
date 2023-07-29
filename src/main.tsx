import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import "./index.css";
import DataTable from "./components/DataTable.tsx";
import AddButton from "./components/AddButton.tsx";
import AddPatient from "./components/AddPatient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/Dashboard"
          element={
            <Dashboard>
              <h1>home page</h1>
            </Dashboard>
          }
        />
        <Route
          path="/Patients"
          element={
            <Dashboard>
              <AddButton />
              <DataTable />
            </Dashboard>
          }
        />
        <Route
          path="/AddPatient"
          element={
            <Dashboard>
              <AddPatient />
            </Dashboard>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

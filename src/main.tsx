import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import "./index.css";

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
          path="/orders"
          element={
            <Dashboard>
              <h1>sex</h1>
            </Dashboard>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

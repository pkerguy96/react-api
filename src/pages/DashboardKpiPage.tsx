import { Box, Typography } from "@mui/material";
import maledoc from "/maldoc.svg";
import RevenueKpi from "../components/Kpis/RevenueKpi";
import TotalAppointmentsKpi from "../components/Kpis/TotalAppointmentsKpi";
import CanceledAppointmentsKpi from "../components/Kpis/CanceledAppointmentsKpi";
import PatientAgeGroupKpi from "../components/Kpis/PatientAgeGroupKpi";
import TotalpatientsKpi from "../components/Kpis/TotalpatientsKpi";

const DashboardKpiPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <Box className="w-full items-center shadow-md p-6 lg:col-span-6 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 text-gray-950 flex flex-wrap gap-4">
          <img src={maledoc} width="100" alt="Maledoc SVG" />
          <div className="flex flex-col flex-1 gap-1">
            <h1 className="text-xl font-semibold">
              Good Evening, <span className="text-pink-600">Aymen Elkor</span>
            </h1>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              iste cum iusto ipsam dolor illum quos doloremque tempore incidunt
              velit!
            </p>
          </div>
        </Box>
        <Box className="w-full shadow-md text-white bg-blue-500 lg:col-span-3">
          <TotalAppointmentsKpi />
        </Box>
        <Box className="w-full shadow-md bg-white text-gray-950 lg:col-span-3">
          <CanceledAppointmentsKpi />
        </Box>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Graphique des revenus</h1>
            <RevenueKpi />
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Appointment Activity</h1>
          </Box>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">
              Groupe d’âge des patients
            </h1>
            <PatientAgeGroupKpi />
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <TotalpatientsKpi />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DashboardKpiPage;

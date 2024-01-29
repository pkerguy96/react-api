import { Box, Typography } from "@mui/material";
import maledoc from "/maldoc.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PieChart } from "@mui/icons-material";
import Pichart from "../components/Kpis/pichart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const DashboardKpiPage = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [400, 300, 600, 200, 800, 500, 700], // Replace with your own data
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [700, 500, 300, 800, 100, 600, 400], // Replace with your own data
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
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
          <div className="p-6 pb-2 flex flex-col flex-1 gap-1">
            <h1 className="text-base font-medium">Total Appointment</h1>
            <p className="text-4xl font-semibold">16,549</p>
          </div>
        </Box>
        <Box className="w-full shadow-md bg-white text-gray-950 lg:col-span-3">
          <div className="p-6 pb-2 flex flex-col flex-1 gap-1">
            <h1 className="text-base font-medium">Appointment Canceled</h1>
            <p className="text-4xl font-semibold text-pink-600">200</p>
          </div>
        </Box>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Hospital Survey</h1>
            <Bar options={options} data={data} />
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Appointment Activity</h1>
          </Box>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Total Patients</h1>
            <Pichart />
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Employees</h1>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DashboardKpiPage;

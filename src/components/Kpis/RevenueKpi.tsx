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
import getGlobal from "../../hooks/getGlobal";
import { Revenue, TotalRevenueKpiClient } from "../../services/KpisService";
import { CACHE_KEY_RevenueKpi } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RevenueKpi = () => {
  const { data: newdata, isLoading } = getGlobal(
    {} as Revenue,
    CACHE_KEY_RevenueKpi,
    TotalRevenueKpiClient,
    {
      staleTime: 3600000, // 1 hour
    }
  );
  if (isLoading) return <LoadingSpinner />;
  console.log(newdata);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Le mois dernier",
        data: [...newdata[1]],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Le mois en cours",
        data: [...newdata[0]],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default RevenueKpi;

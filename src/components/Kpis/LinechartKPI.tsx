import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      beginAtZero: true,
    },
    y: {
      display: false,
      beginAtZero: true,
    },
  },
};

const LinechartKPI: React.FC<{ dataset: any }> = ({ dataset }) => {
  return <Line options={options} data={dataset} />;
};

export default LinechartKPI;

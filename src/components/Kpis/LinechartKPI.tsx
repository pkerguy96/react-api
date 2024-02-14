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
      display: false, // Hide x-axis
    },
    y: {
      display: false, // Hide y-axis
    },
  },
};
interface Dataset {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}
const LinechartKPI: React.FC<{ dataset: Dataset }> = ({ dataset }) => {
  return <Line options={options} data={dataset} />;
};

export default LinechartKPI;

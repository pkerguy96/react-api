import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import getGlobal from "../../hooks/getGlobal";
import {
  AgeData,
  Agegroup,
  PatientsAgeGroupKpiClient,
} from "../../services/KpisService";
import { CACHE_KEY_Agegroup } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientAgeGroupKpi = () => {
  const { data: age, isLoading } = getGlobal(
    {} as AgeData,
    CACHE_KEY_Agegroup,
    PatientsAgeGroupKpiClient,
    { staleTime: 360000 }
  );
  if (isLoading) return <LoadingSpinner />;
  console.log(age);
  const options = {
    layout: {
      padding: {
        bottom: 2,
      },
    },
  };

  const data = {
    labels: ["0-20", "21-30", "31-40", "41-50", "51-60"],
    datasets: [
      {
        label: "# of Votes",
        data: age?.map((item: Agegroup) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default PatientAgeGroupKpi;

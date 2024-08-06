import { Line } from "react-chartjs-2";
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
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dataSet }) => {
  if (!dataSet || dataSet.length === 0) {
    return <div>No data available</div>;
  }

  const labels = dataSet.map((entry) =>
    dayjs(entry.timestamp).format("YYYY-MM-DD HH:mm:ss")
  );
  const data = dataSet.map((entry) => entry.price);

  const dataForLine = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#FF4191",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        data: data,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex justify-center w-full">
      <Line data={dataForLine} options={options} />
    </div>
  );
};

export default LineChart;

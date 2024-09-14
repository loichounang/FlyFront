import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//import APIBaseURL from "../../../services/ApiServices";
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
//import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppLineChart = ({ contentURL, chartName }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    /*const fetchData = async () => {
      try {
        const response = await axios.get(APIBaseURL + contentURL);
        if(response.status >=200 && response.status <= 300){
            const data = response.data;
            setChartData({
                labels: data.labels,
                datasets: [
                  {
                    label: chartName,
                    data: data.values,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                  },
                ],
              });
        } else {
            const data = [
                {labels: "name", values: 25},
                {labels: "name", values: 27},
                {labels: "name", values: 32},
                {labels: "name", values: 15},
                {labels: "name", values: 10},
                {labels: "name", values: 11},
                {labels: "name", values: 125},
            ];
            setChartData({
                labels: data.labels,
                datasets: [
                    {
                        label: chartName,
                        data: data.values,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true,
                    }
                ]
            })
        }
        
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchData();*/
  }, [contentURL, chartName]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default AppLineChart;

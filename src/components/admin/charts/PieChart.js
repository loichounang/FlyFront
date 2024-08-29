import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import APIBaseURL from "../../../services/ApiServices";

const RechartsPieChart = ({ contentURL, chartName }) => {
  const [chartData, setChartData] = useState([]);

  // Fonction pour récupérer les données depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIBaseURL + contentURL);
        const data = response.data;

        const formattedData = data.labels.map((label, index) => ({
          name: label,
          value: data.values[index],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchData();
  }, [contentURL]);

  // Données par défaut pour le diagramme circulaire (Pie Chart)
  const defaultData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <ResponsiveContainer width="100%" height={400}>
        <h4 style={{color: "white", textAlign: "right", paddingLeft: "1em"}}>
            {chartName}
        </h4>
      <PieChart>
        <Pie
          data={chartData.length ? chartData : defaultData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.length ? chartData : defaultData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: "#333333", borderColor: "#8884d8", color: "#ffffff" }} 
          cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} 
        />
        <Legend 
          verticalAlign="top" 
          align="right" 
          iconType="circle" 
          iconSize={10} 
          wrapperStyle={{ color: "#cccccc" }} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartsPieChart;

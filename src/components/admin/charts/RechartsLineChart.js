import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//import axios from "axios";
//import APIBaseURL from "../../../services/ApiServices";

const RechartsLineChart = ({ contentURL, chartName }) => {
  const [chartData, setChartData] = useState([]);

  // Fonction pour récupérer les données depuis le backend
  useEffect(() => {
    /*const fetchData = async () => {
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

    fetchData();*/
  }, [contentURL]);

  // Données par défaut pour le diagramme linéaire
  const defaultData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
        <h4 style={{color: "white", textAlign: "left", paddingLeft: "1em"}}>
            {chartName}
        </h4>
      <LineChart data={chartData.length ? chartData : defaultData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#444444"/>
        <XAxis dataKey="name" stroke="#cccccc" />
        <YAxis stroke="#cccccc" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#333333", borderColor: "#8884d8", color: "#ffffff" }} 
          cursor={{ stroke: '#8884d8', strokeWidth: 2 }} 
        />
        <Legend verticalAlign="top" align="right" iconType="circle" iconSize={10} wrapperStyle={{ color: "#cccccc" }} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          strokeWidth={3} 
          dot={{ r: 5 }} 
          activeDot={{ r: 8, fill: "#8884d8" }} 
          fillOpacity={1} 
          fill="url(#colorUv)" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RechartsLineChart;

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

// Fonction pour générer une couleur hexadécimale aléatoire
const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

const RechartsPieChart = ({ contentURL, chartName }) => {
  const [chartData, setChartData] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/${contentURL}`);
        const data = response.data;

        // Formater les données en un format adapté au graphique
        const formattedData = data.map((category) => ({
          name: category.name, // Utilise le libellé comme nom de la catégorie
          value: category.nombre_de_cours, // Assure-toi que ce champ représente le nombre de cours
        }));

        // Générer un tableau de couleurs aléatoires de la même longueur que les catégories
        const generatedColors = Array.from({ length: formattedData.length }, generateRandomColor);

        setChartData(formattedData);
        setColors(generatedColors);
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchData();
  }, [contentURL]);

  // Données par défaut pour tester le rendu du graphique
  const defaultData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
  ];

  // Générer des couleurs aléatoires pour les données par défaut
  const defaultColors = Array.from({ length: defaultData.length }, generateRandomColor);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <div style={{ color: "white", textAlign: "right", paddingLeft: "1em" }}>
        <h4>{chartName}</h4>
      </div>
      <PieChart>
        <Pie
          data={chartData.length ? chartData : defaultData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {(chartData.length ? chartData : defaultData).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartData.length ? colors[index] : defaultColors[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#333333", borderColor: "#8884d8", color: "#ffffff" }}
          cursor={{ fill: "rgba(136, 132, 216, 0.1)" }}
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

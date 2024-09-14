import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
//import APIBaseURL from "../../../services/ApiServices";
//import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartMessages = ({ contentURL, chartName }) => {
    function counter() {
        let val = [];
        for (let i = 1; i < 32; i++) {
            val.push(i);
        }
        return val;
    }

    const dataLabels = counter();

    function generateRandomNumbers(count, min = 10, max = 300) {
        const numbers = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.push(randomNumber);
        }
        return numbers;
    }
    
    // Exemple d'utilisation :
    const randomNumbers = generateRandomNumbers(31); // Génère 20 nombres aléatoires

    // Fonction pour déterminer la couleur basée sur la valeur
function getColor(value) {
    if (value < 50) {
        return "#e74c3c"; // Critique
    } else if (value < 100) {
        return "#f39c12"; // Moyen
    } else {
        return "#2ecc71"; // Bon
    }
}

// Générer les couleurs basées sur les valeurs dans randomNumbers
const backgroundColors = randomNumbers.map(getColor);
    
  const [chartData, setChartData] = useState({
    labels: dataLabels, // Remplacez ceci par la bonne structure des données
    datasets: [
      {
        label: "Interactions/Messages",
        data: randomNumbers, // Données par défaut
        backgroundColor: backgroundColors,
      },
    ],
  });

  useEffect(() => {
    /*const fetchData = async () => {
      try {
        const response = await axios.get(APIBaseURL + contentURL);
        const data = response.data;

        const formattedData = data.days.map((day, index) => ({
          label: day,
          value: data.values[index],
        }));

        setChartData({
          labels: formattedData.map((d) => d.label),
          datasets: [
            {
              label: "Interactions/Messages",
              data: formattedData.map((d) => d.value),
              backgroundColor: formattedData.map((d) => {
                if (d.value < 50) return "#e74c3c"; // Critique
                if (d.value < 100) return "#f39c12"; // Avertissement
                return "#2ecc71"; // Bon
              }),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchData();*/
  }, [contentURL]);

  return (
    <div style={{ backgroundColor: "#1a1a1a", padding: "20px", borderRadius: "10px", width: "100%" }}>
        <h4 style={{color: "white", textAlign: "left", paddingLeft: "1em"}}>
            {chartName}
        </h4>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              ticks: { color: "white" },
            },
            y: {
              ticks: { color: "white" },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
};

export default BarChartMessages;

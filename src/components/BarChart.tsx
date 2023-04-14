import React, { useState, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

interface barProps {
  chartData: any
}

export default function BarChart({ chartData }: barProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const newChart = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartData.options
      });

      return () => {
        newChart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div>
  <div>
     <Bar data={chartData} options={chartData.options} />;
 </div>
    </div>
  );
}
  
//   return (
//     <div>
//     <Bar data={chartData} options={chartData.options} />;
//     </div>
//   )
// }

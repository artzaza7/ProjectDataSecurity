import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartExample = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // ใช้เก็บอินสแตนซ์ของ Chart

  const data = {
    labels: ["Type1", "Type2", "Type3", "Type4"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        borderWidth: 1,
        backgroundColor: [
          "#FF8080",
          "#7ECF77",
          "#AC4DA3",
          "#DDD626",
        ],
      },
    ],
  };

  useEffect(() => {
  const config = {
    type: "pie",
    data: data,
    options: {
      plugins: {
        legend: {
          onHover: handleHover,
          onLeave: handleLeave,
        },
      },
    },
  };

  if (chartInstance.current) {
    chartInstance.current.destroy(); // ทำลาย Chart เก่า (ถ้ามี)
  }

  const ctx = chartRef.current.getContext("2d");
  chartInstance.current = new Chart(ctx, config);

  return () => {
    // ทำลาย Chart เมื่อ Component ถูก Unmount
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };
}, [data]); // กำหนด dependencies เป็น 'data' เนื่องจากมีการใช้ใน config


  function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + "4D";
    });
    legend.chart.update();
  }

  function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
  }

  return <canvas ref={chartRef} />;
};

export default ChartExample;

import React, { useEffect, useRef } from "react";
import Chart, {  } from "chart.js/auto";

function ChartExample(props) {
  const { countAllTask, categoryTasks } = props

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // ใช้เก็บอินสแตนซ์ของ Chart

  useEffect(() => {
    const data = {
      labels: categoryTasks,
      datasets: [
        {
          label: "จำนวนทั้งหมด",
          data: countAllTask,
          borderWidth: 1,
          backgroundColor: [
            "#FF8080",
            "#7ECF77",
            "#AC4DA3",
            "#d6a820",
          ],
        },
      ],
    };
    const noData = {
      id: 'noData',
      afterDatasetsDraw: (chart, args, plugins) => {
        const { ctx, data, chartArea: { top, left, width, height } } = chart;
    
        ctx.save();
    
        if (data.datasets[0].data[0] === 0 && data.datasets[0].data[1] === 0 && data.datasets[0].data[2] === 0 && data.datasets[0].data[3] === 0) {
          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const radius = Math.min(width, height) / 2;
    
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 0.5;
          ctx.fillStyle = 'rgba(255,255,255, 0.5)';
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.font = 'bold 20px ibm plex sans thai';
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('ยังไม่พบข้อมูลงาน', centerX, centerY);
        }
    
        ctx.restore();
      }
    };
    
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
      plugins: [noData]
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
  }, [countAllTask, categoryTasks]); // กำหนด dependencies เป็น 'data' เนื่องจากมีการใช้ใน config


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

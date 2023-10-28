import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

// Import Library
import jwtDecode from "jwt-decode"

// Import API
import { getAllCategoryTasks } from "../../../services/CategoryTaskService"
import { getUserTasksCount } from "../../../services/UserTaskService"

function ChartExample() {
  // useNavigate
  const navigate = useNavigate();

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // ใช้เก็บอินสแตนซ์ของ Chart

  // for call API
  const [loading, setLoading] = useState(true)
  const [categoryTasks, setCategoryTasks] = useState([])
  const [countAllTask, setCountAllTask] = useState([0, 0, 0, 0])

  async function getInitData() {
    const token = localStorage.getItem('token')
    console.log(countAllTask);
    if (token) {
      const username = jwtDecode(token).username
      try {

        // for categoties in Pie Chart
        const responseCategory = await getAllCategoryTasks();
        const categoriesName = []
        for (let i = 0; i < responseCategory.data.length; i++) {
          categoriesName.push(responseCategory.data[i].name)    
        }
        setCategoryTasks(categoriesName)

        // for count All UserTask in Pie Chart
        const responseCount = await getUserTasksCount(username)
        if(responseCount.data[0] === 0 && responseCount.data[1] === 0 && responseCount.data[2] === 0 && responseCount.data[3]=== 0 ){
          responseCount.data = [1, 1, 1, 1]
        }
        console.log(responseCount.data);
        setCountAllTask(responseCount.data)

        

        // Finish Call API
        setLoading(false)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    else {
      console.log("Don't have token")
      navigate("/")
    }
  }

  const data = {
    labels: loading ? ["Loading...", "Loading...", "Loading...", "Loading..."] : categoryTasks,
    datasets: [
      {
        label: "จำนวนทั้งหมด",
        data: loading ? [0, 0, 0, 0] : countAllTask,
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
  console.log(countAllTask)

  useEffect(() => {
    getInitData()
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
  }, [loading]); // กำหนด dependencies เป็น 'data' เนื่องจากมีการใช้ใน config


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

import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

// Import Library
import jwtDecode from "jwt-decode"

// Import API
import { getAllCategoryTasks } from "../../../services/CategoryTaskService"
import { getAllUserTasksByStatusId } from "../../../services/UserTaskService"
import { getAllStatus, } from "../../../services/StatusService"

function ChartExample() {
  // useNavigate
  const navigate = useNavigate();

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // ใช้เก็บอินสแตนซ์ของ Chart

  // for call API
  const [loading, setLoading] = useState(true)
  const [categoryTasks, setCategoryTasks] = useState([])

  // without Service
  const [countAllTask, setCountAllTask] = useState([0, 0, 0, 0])

  async function getInitData() {
    const token = localStorage.getItem('token')

    if (token) {
      const username = jwtDecode(token).username
      try {
        // for getALL status
        const statusId = []
        const responseStatus = await getAllStatus();
        for (let i = 0; i < responseStatus.data.length; i++) {
          statusId.push(responseStatus.data[i].id)
        }

        const countData = [] // Collect name with value of Categories
        // for categoties in Pie Chart
        const responseCategory = await getAllCategoryTasks();
        const categoriesName = []
        const categoriesId = []
        for (let i = 0; i < responseCategory.data.length; i++) {
          categoriesName.push(responseCategory.data[i].name)
          categoriesId.push(responseCategory.data[i].id)
          countData.push({ name: responseCategory.data[i].name, value: 0 })
        }
        setCategoryTasks(categoriesName)
        
        // for count in Pie Chart
        for (let i = 0; i < statusId.length; i++) {
          const statusID = statusId[i]
          const responseGetAllUserTasksByStatusId = await getAllUserTasksByStatusId(username, statusID)
          console.log(responseGetAllUserTasksByStatusId.data)
          for (let y = 0; y < responseGetAllUserTasksByStatusId.data.length; y++) {
            const task = responseGetAllUserTasksByStatusId.data[y].task.category_task.name;
            for (let k = 0; k < countData.length; k++) {
              if (countData[k].name === task) {
                countData[k].value = countData[k].value + 1
                break;
              }
            }
          }
        }
        const result = [] // Collect Only Number
        for (let i = 0; i < countData.length; i++) {
          result.push(countData[i].value)
        }
        setCountAllTask(result)

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
    labels: !loading ? categoryTasks : ["Type1", "Type2", "Type3", "Type4"],
    datasets: [
      {
        label: "# of Votes",
        data: !loading ? countAllTask : [12, 19, 3, 5],
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

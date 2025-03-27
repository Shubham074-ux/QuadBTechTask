import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTask, fetchWeather } from "../redux/taskSlice"; // Import Redux actions
import "../styles/Middle.css";

const Middle = () => {
  const [task, setTask] = useState("");
  const [taskType, setTaskType] = useState("indoor");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskCity, setTaskCity] = useState("");
  const [cities, setCities] = useState([]);  

  const dispatch = useDispatch();
  
  

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
        const citiesData = response.data.data.find(country => country.country === "India")?.cities || [];
        setCities(citiesData);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    fetchCities();
  }, []);
  


  const handleAddTask = () => {
    if (!task) {
      alert("Please enter a task.");
      return;
    }

    const newTask = { text: task, type: taskType, priority: taskPriority, city: taskCity, weather: null };
    dispatch(addTask(newTask));
    if (taskType === "outdoor" && taskCity != null) {
      dispatch(fetchWeather(taskCity));
    }

    setTask("");
    setTaskCity("");
    setTaskPriority("low");
  };

  return (
    <div className="task-container">
      <div style={{display:"flex"}}>
        <input
          type="text"
          className="task-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task here..."
        />
        <button className="addbtn" onClick={handleAddTask}>
          <FaPlus />
        </button>
      </div>
<br /><br /><br />
      <div className="filters" >
        <label className="label">SELECT TASK TYPE:</label>
        <select className ="choose" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>

     
        <label className="label">Select City:</label>
<select className="choose" value={taskCity} onChange={(e) => setTaskCity(e.target.value)}>
  <option value="">Select a city</option>
  {cities.map((city, index) => (
    <option key={index} value={city}>{city}</option>
  ))}
</select>


        <label className="label">SELECT PRIORITY:</label>
        <select className ="choose" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default Middle;

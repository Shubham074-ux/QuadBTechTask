import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../redux/taskSlice";
import "../styles/Middle.css";

const getWeatherEmoji = (weatherMain) => {
    const weatherEmojis = {
        clearsky: "☀️",
        clouds: "☁️",
        rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌫️",
        haze: "❄️",
        Smoke: "🌪️",
        Dust: "🌪️",
    };
    return weatherEmojis[weatherMain] || "🌍";
};

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [completedTasks, setCompletedTasks] = useState({}); // Track completed tasks

    const toggleDone = (index) => {
        setCompletedTasks((prev) => ({
            ...prev,
            [index]: !prev[index] 
        }));
    };

    return (
        <div className="task-list">
            {tasks.map((t, index) => (
                <div
                    key={index}
                    className="task-card"
                    style={{
                        backgroundColor: completedTasks[index] ? "#94f3ba" : "white",
                        transition: "0.3s ease-in-out"
                    }}
                >
                    {t.type === "outdoor" && t.weather && (
                        <p style={{ margin: "2px", color: "gray", display: "flex" }}>
                            {getWeatherEmoji(t.weather)} {t.weather} ({t.temp}°C)
                        </p>
                    )}
                    <h4>{t.text}</h4>

                    <div className="btnclass">
                        <button className="remove-btn" onClick={() => dispatch(removeTask(index))}>
                            Remove
                        </button>
                        <button className="done-btn" onClick={() => toggleDone(index)}>
                            {completedTasks[index] ? "Undo" : "Done"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;

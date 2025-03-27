import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


const API_KEY = apiKey; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${apiKey}`);
      return { city, weather: response.data.weather[0].description, temp: response.data.main.temp };
    } catch (error) {
      return { city, weather: "Unavailable", temp: "N/A" };
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((task) => task.city === action.payload.city);
      if (index !== -1) {
        state.tasks[index].weather = action.payload.weather;
        state.tasks[index].temp = action.payload.temp;
      }
    });
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;

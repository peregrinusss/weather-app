import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = (params: { cityName: any; days: any }) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationEndpoint = (params: { cityName: any }) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: any) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchWeatherForecast = (params: { cityName: any; days: any }) => {
  return apiCall(forecastEndpoint(params));
};

export const fetchLocations = (params: { cityName: any }) => {
  return apiCall(locationEndpoint(params));
};

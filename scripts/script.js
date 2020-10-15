import config from "./config.js";
import CityWeatherInfo from "./classes.js";
import RenderWeatherInfo from "./classes.js";

$(document).ready(function () {
  const weatherAPI = config;

  //event listener
  $("#searchBtn").on("click", (event) => {
    let userInput = $("#searchBox").val().trim();
    clickHandler(userInput);
  });

  //creates new city object and displays it on page
  function clickHandler(userInput) {
    let newSingleDayForecast = new CityWeatherInfo.CityWeatherInfo(
      weatherAPI.singleDay,
      weatherAPI.APIKey,
      weatherAPI.UVCall,
      userInput
    );
    let newFiveDayForecast = new CityWeatherInfo.CityWeatherInfo(
      weatherAPI.fiveDay,
      weatherAPI.APIKey,
      weatherAPI.UVCall,
      userInput
    );
    let newRenderForecast = new RenderWeatherInfo.RenderWeatherInfo(
      newSingleDayForecast.getWeatherInfo(),
      newFiveDayForecast.getWeatherInfo(),
      newSingleDayForecast.getUVInfo()
    );
    newRenderForecast.getRenderTemplate();
    newRenderForecast.getRenderForecastTemplate();
    newRenderForecast.getRenderUV();
  }
});

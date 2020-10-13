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
    console.log(CityWeatherInfo);
    let newSingleDayForecast = new CityWeatherInfo.CityWeatherInfo(
      weatherAPI.singleDay,
      weatherAPI.APIKey,
      userInput
    );
    let newFiveDayForecast = new CityWeatherInfo.CityWeatherInfo(
      weatherAPI.fiveDay,
      weatherAPI.APIKey,
      userInput
    );
    let newRenderForecast = new RenderWeatherInfo.RenderWeatherInfo(
      newSingleDayForecast.getWeatherInfo()
    );
    newRenderForecast.getRenderTemplate();
  }
});

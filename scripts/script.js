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

  async function getLatLon(cityData) {
    await Promise.resolve(cityData).then((cityData) => {
      let newUVInfo = new CityWeatherInfo.CityWeatherInfo(
        weatherAPI.UVCall,
        weatherAPI.APIKey,
        `lat=${cityData.coord.lat}&lon=${cityData.coord.lon}`
      );
      async function renderUV(data) {
        await Promise.resolve(data).then((data) => {
          console.log(data.getWeatherInfo());
        });
      }
      renderUV(newUVInfo);
    });
  }

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

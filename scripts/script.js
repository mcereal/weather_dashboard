import config from "./config.js";

$(document).ready(function () {
  const weatherAPI = config;
  $("#searchBtn").on("click", (event) => {
    let userInput = $("#searchBox").val().trim();
    clickHandler(userInput);
  });

  class CityWeatherInfo {
    constructor(APIUrl, APIKey, userInput) {
      this.APIUrl = APIUrl;
      this.APIKey = APIKey;
      this.userInput = userInput;
      this.weatherInfoCall = async function ajaxCall() {
        let result = await $.ajax({
          url: `${this.APIUrl}${this.userInput}${this.APIKey}`,
          method: "GET",
        });
        return result;
      };
    }
    getWeatherInfo() {
      return this.weatherInfoCall();
    }
  }

  async function renderWeatherInfo(city) {
    await Promise.resolve(city).then((city) => {
      $("#city").text(`${city.name}`);
      $("#date").text(` ${timeStampConverter(city.dt)}`);
      $("#temperature").text(
        `${Math.round((city.main.temp - 273) * 1.8 + 32)} \xB0 F`
      );
      $("#humidity").text(`${city.main.humidity}`);
      $("#windSpeed").text(`${city.wind.speed} mph`);
      $("#uVIndex").text(`${city.main.humidity}`);
    });
  }

  function clickHandler(userInput) {
    let newCityInfo = new CityWeatherInfo(
      weatherAPI.APIUrl,
      weatherAPI.APIKey,
      userInput
    );
    renderWeatherInfo(newCityInfo.getWeatherInfo());
  }

  function timeStampConverter(timestamp) {
    return moment.unix(timestamp).format("MM/DD/YYYY");
  }
});

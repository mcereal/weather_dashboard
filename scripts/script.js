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

  function clickHandler(userInput) {
    let newCityInfo = new CityWeatherInfo(
      weatherAPI.APIUrl,
      weatherAPI.APIKey,
      userInput
    );

    async function consoleTest(city) {
      await Promise.resolve(city).then((city) => {
        $("#temperature").text(`${city.main.temp}`);
      });
    }
    consoleTest(newCityInfo.getWeatherInfo());
  }

  // myCity.getWeatherInfo();
  // console.log(myCity.getWeatherInfo());

  // $.ajax({
  //   url: weatherAPI.APIUrl,
  //   method: "GET",
  // })
  //   // We store all of the retrieved data inside of an object called "response"
  //   .then(function (response) {
  //     // Log the queryURL
  //     console.log(weatherAPI);

  //     // Log the resulting object
  //     console.log(response);

  //     // Transfer content to HTML
  //     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
  //     $(".wind").text("Wind Speed: " + response.wind.speed);
  //     $(".humidity").text("Humidity: " + response.main.humidity);

  //     // Convert the temp to fahrenheit
  //     var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  //     // add temp content to html
  //     $(".temp").text("Temperature (K) " + response.main.temp);
  //     $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

  //     // Log the data in the console as well
  //     console.log("Wind Speed: " + response.wind.speed);
  //     console.log("Humidity: " + response.main.humidity);
  //     console.log("Temperature (F): " + tempF);
  //   });
});

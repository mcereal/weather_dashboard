//class for returning server JSON for different APIs
export default {
  CityWeatherInfo: class CityWeatherInfo {
    constructor(APIUrl, APIKey, UVCall, userInput) {
      this.APIUrl = APIUrl;
      this.APIKey = APIKey;
      this.UVCall = UVCall;
      this.userInput = userInput;
      this.weatherInfoCall = async () => {
        let result = await $.ajax({
          url: `${this.APIUrl}${this.userInput}${this.APIKey}`,
          method: "GET",
        });
        return result;
      };
      this.uvInfoCall = async () => {
        let weatherInfo = this.weatherInfoCall();
        let uvInfoResponse = Promise.resolve(weatherInfo).then(
          (weatherInfo) => {
            async function callUVAPI(UVCall) {
              let result = await $.ajax({
                url: `${UVCall}${`lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}`}${APIKey}`,
                method: "GET",
              });
              return result;
            }
            return callUVAPI(UVCall, APIKey);
          }
        );
        return uvInfoResponse;
      };
    }
    getWeatherInfo() {
      return this.weatherInfoCall();
    }
    getUVInfo() {
      return this.uvInfoCall();
    }
  },

  //class for rendering server data on page
  RenderWeatherInfo: class RenderWeatherInfo {
    constructor(city, cityFive, uvInfo) {
      this.uvInfo = uvInfo;
      this.city = city;
      this.cityFive = cityFive;
      this.renderForecastTemplate = async (cityFive) => {
        await Promise.resolve(cityFive).then((cityFive) => {
          const dayIndexPositions = [7, 15, 23, 31, 39];
          for (let i = 0; i < 5; i++) {
            $(`#date${i}`).text(
              `${moment
                .unix(cityFive.list[dayIndexPositions[i]].dt)
                .format("MM/DD/YYYY")}`
            );
            $(`#temp${i}`).text(
              `${Math.round(
                (cityFive.list[dayIndexPositions[i]].main.temp - 273) * 1.8 + 32
              )}`
            );
            $(`#humidityFuture${i}`).text(
              `${cityFive.list[dayIndexPositions[i]].main.humidity}%`
            );
            $(`#icon${i}`).attr(
              "src",
              `http://openweathermap.org/img/wn/${
                cityFive.list[dayIndexPositions[i]].weather[0].icon
              }.png%`
            );
          }
        });
      };
      this.renderTemplate = async (city) => {
        await Promise.resolve(city).then((city) => {
          $("#city").text(`${city.name}`);
          $("#date").text(` ${moment.unix(city.dt).format("MM/DD/YYYY")}`);
          $("#temperature").text(
            `${Math.round((city.main.temp - 273) * 1.8 + 32)} \xB0 F`
          );
          $("#humidity").text(`${city.main.humidity}`);
          $("#windSpeed").text(`${city.wind.speed} mph`);
          let cityName = $("<li class='list-group-item'>").text(`${city.name}`);
          cityName.attr("id", `${city.name}`);
          if (Object.keys(localStorage).includes(city.name)) {
            null;
          } else {
            $("#cityHistoryList").prepend(cityName);
            localStorage.setItem(`${city.name}`, `${city.name}`);
          }
        });
      };

      this.renderUV = async (uvInfo) => {
        await Promise.resolve(uvInfo).then((uvInfo) => {
          $("#uvIndex").removeClass("btn btn-danger btn-warning btn-success");
          $("#uvIndex").text(`${uvInfo.value}`);
          if (uvInfo.value > 10.0) {
            $("#uvIndex").addClass("btn btn-danger");
          } else if (uvInfo.value > 5.0) {
            $("#uvIndex").addClass("btn btn-warning");
          } else $("#uvIndex").addClass("btn btn-success");
        });
      };
    }
    getRenderTemplate() {
      return this.renderTemplate(this.city);
    }
    getRenderForecastTemplate() {
      return this.renderForecastTemplate(this.cityFive);
    }
    getRenderUV() {
      return this.renderUV(this.uvInfo);
    }
  },
};

export default {
  CityWeatherInfo: class CityWeatherInfo {
    constructor(APIUrl, APIKey, userInput) {
      this.APIUrl = APIUrl;
      this.APIKey = APIKey;
      this.userInput = userInput;
      this.weatherInfoCall = async () => {
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
  },
  RenderWeatherInfo: class RenderWeatherInfo {
    constructor(city, cityFive) {
      this.city = city;
      this.cityFive = cityFive;
      this.renderForecastTemplate = async (cityFive) => {
        await Promise.resolve(cityFive).then((cityFive) => {
          const dayIndexPositions = [7, 15, 23, 31, 39];
          const textIds = {
            date: ["date1", "date2", "date3", "date4", "date5"],
            temp: ["temp1", "temp2", "temp3", "temp4", "temp5"],
            icon: ["icon1", "icon2", "icon3", "icon4", "icon5"],
            humid: [
              "humidityFuture1",
              "humidityFuture2",
              "humidityFuture3",
              "humidityFuture4",
              "humidityFuture5",
            ],
          };
          for (let i = 0; i < 5; i++) {
            $(`#${textIds.date[i]}`).text(
              `${moment
                .unix(cityFive.list[dayIndexPositions[i]].dt)
                .format("MM/DD/YYYY")}`
            );
            $(`#${textIds.temp[i]}`).text(
              `${Math.round(
                (cityFive.list[dayIndexPositions[i]].main.temp - 273) * 1.8 + 32
              )}`
            );
            $(`#${textIds.humid[i]}`).text(
              `${cityFive.list[dayIndexPositions[i]].main.humidity}%`
            );
            $(`#${textIds.icon[i]}`).attr(
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
          $("#uVIndex").text(`${city.main.humidity}`);
          let cityName = $("<li class='list-group-item'>").text(`${city.name}`);
          $("#cityHistoryList").append(cityName);
        });
      };
    }
    getRenderTemplate() {
      return this.renderTemplate(this.city);
    }
    getRenderForecastTemplate() {
      return this.renderForecastTemplate(this.cityFive);
    }
  },
};

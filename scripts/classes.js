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
          console.log(cityFive);
          let cardDiv = $();
          cityFive.list.forEach((item) => $("#weatherCardRow").append(cardDiv));
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

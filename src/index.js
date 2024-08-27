function search(event) {
  if (event) {
    event.preventDefault();
  }

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  let apiKey = "063f17494d52a3dfa35bf52cbdeeo6at";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  getForecast(city, apiKey);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function getForecast(city, apiKey) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(0, 5);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  forecast.forEach(function (day) {
    let dayName = new Date(day.time * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature max-temp">${Math.round(
            day.temperature.maximum
          )}°C</div>
          <div class="weather-forecast-temperature min-temp">${Math.round(
            day.temperature.minimum
          )}°C</div>
        </div>
        <div class="weather-forecast-icon"><img src="${
          day.condition.icon_url
        }" alt="" class="weather-app-icon"/></div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function initialize() {
  let searchInputElement = document.querySelector("#search-input");
  searchInputElement.value = "Paris"; // Default city
  search(); // Trigger the search function without an event
}

// Call initialize function on page load
initialize();

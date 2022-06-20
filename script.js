function changeCity(event) {
  event.preventDefault();
  let mainSearch = document.querySelector("#mainSearch");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${mainSearch.value}`;
}
let formSearch = document.querySelector("#cityButtons");
formSearch.addEventListener("submit", changeCity);

let datetime = document.querySelector(".datetime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated: ${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="70"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )} </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function searchCity(city) {
  let apiKey = "ed0417bf8fecd4ab27286ed64422cb0b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}

function getForecast(coordinates) {
  let apiKey = "ed0417bf8fecd4ab27286ed64422cb0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let showTemperature = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  showTemperature.innerHTML = `${temp}`;

  let showHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  showHumidity.innerHTML = `Humidity: ${humidity}%`;

  let showWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  showWind.innerHTML = `Wind: ${wind} Km/H`;

  let showPrecipitation = document.querySelector("#precipitation");
  let precipitation = response.data.clouds.all;
  showPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let showDateTime = document.querySelector("datetime");
  datetime.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#iconWeather");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertC);

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#mainSearch").value;
  searchCity(city);
}
let formCity = document.querySelector("#cityButtons");
formCity.addEventListener("submit", clickSubmit);

function showLocation(position) {
  let apiKey = "ed0417bf8fecd4ab27286ed64422cb0b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

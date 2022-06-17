function changeCity(event) {
  event.preventDefault();
  let mainSearch = document.querySelector("#mainSearch");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${mainSearch.value}`;
}
let formSearch = document.querySelector("#cityButtons");
formSearch.addEventListener("submit", changeCity);

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertC);

let now = new Date();
let datetime = document.querySelector(".datetime");
let days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
datetime.innerHTML = `${day} ${hours}:${minutes}`;
function searchCity(city) {
  let apiKey = "ed0417bf8fecd4ab27286ed64422cb0b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
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
  showWind.innerHTML = `Wind: ${wind} m/s`;

  let showPrecipitation = document.querySelector("#precipitation");
  let precipitation = response.data.clouds.all;
  showPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
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

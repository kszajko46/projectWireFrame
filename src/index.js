function dateAndTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}  ${hours}:${minutes}`;
}

let now = new Date();
let p = document.querySelector("p");

p.innerHTML = dateAndTime(now);

function showWeather(response) {
  console.log(response.data);
  document.querySelector(".place").innerHTML = response.data.name;
  document.querySelector("#temp-hi").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function search(city) {
  let apiKey = "1921aa558d6b3e6d5b52f0eeb4ab5751";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}

function exactWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  search(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1921aa558d6b3e6d5b52f0eeb4ab5751";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityInformation = document.querySelector("#city-information");

cityInformation.addEventListener("submit", exactWeather);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", currentLocation);

search("Chicago");

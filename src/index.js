function dateAndTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
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
let h2 = document.querySelector("h2");

h2.innerHTML = dateAndTime(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col-2">
                    <div class="sixDayForecast">${formatDay(
                      forecastDay.dt
                    )}</div>
                    
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt="forcast"
                      width="40px"
                    />
                    <div class="weatherTempTwo">
                      <span class="weatherTempMax">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="weatherTempMin">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div>
                  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1921aa558d6b3e6d5b52f0eeb4ab5751";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#exact-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#exact-loc");
  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1921aa558d6b3e6d5b52f0eeb4ab5751";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#exact-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Chicago");

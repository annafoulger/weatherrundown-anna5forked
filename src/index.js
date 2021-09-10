let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#cityID").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML =
    Math.round(response.data.main.temp) + "  °C";
}
//
//
//
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea85eed299f838f08577ab2943f15dd1&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
  console.log(apiUrl);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//
//Current Position
function showTemp(response) {
  let mainTemp = Math.round(response.data.main.temp);
  let locationNow = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `Current Temperature in ${locationNow} is ${mainTemp}°C`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ea85eed299f838f08577ab2943f15dd1&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#locationButton");
button.addEventListener("click", getCurrent);

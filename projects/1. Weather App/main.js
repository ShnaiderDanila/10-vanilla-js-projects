const apiKey = "421dde1f591bf90767847d5b0d29d694";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=ru";

const search = document.querySelector('.search')
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector('.weather__icon');
const weatherTemp = document.querySelector('.weather__temp');
const weatherCity = document.querySelector(".weather__city");
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherWind = document.querySelector('.weather__wind');

const error = document.querySelector(".error");

async function checkWeather(city) {
  error.style.display = "none";
  try {
    
    if (/[0-9]/g.test(city)) {
      throw new Error('Введены некорректные данные');
    }

    const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
    const data = await response.json();

    weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherCity.textContent = data.name;
    weatherHumidity.textContent = `${data.main.humidity} %`;
    weatherWind.textContent = `${data.wind.speed} м/с`;

    const weatherConditions = data.weather[0].main;

    switch (weatherConditions) {
      case 'Clear':
        weatherIcon.src = "./images/clear.png";
        break;
      case 'Clouds':
        weatherIcon.src = "./images/clouds.png";
        break;
      case 'Rain':
        weatherIcon.src = "./images/rain.png";
        break;
      case 'Drizzle':
        weatherIcon.src = "./images/drizzle.png";
        break;
      case 'Snow':
        weatherIcon.src = "./images/snow.png";
        break;
      case 'Mist':
        weatherIcon.src = "./images/mist.png";
        break;
      default:
        weatherIcon.src = "./images/clear.png";
    }

    weather.style.display = "block";

  } catch (err) {
    error.style.display = "block";
    weather.style.display = "none";
  }
};

search.addEventListener('submit', (evt) => {
  evt.preventDefault()
  checkWeather(searchInput.value)
});
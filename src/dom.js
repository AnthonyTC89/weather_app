/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import getWeatherInfo from './weather';

function showMessage(msg) {
  // eslint-disable-next-line no-alert
  window.alert(msg);
}

function showLoading() {
  const picture = document.querySelector('#loading-icon');
  picture.classList.remove('hidden');
}

async function timeout(ms) {
  showLoading();
  await new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}

function hiddenLoading() {
  const picture = document.querySelector('#loading-icon');
  picture.classList.add('hidden');
}

function clearWeatherInfo() {
  document.querySelector('#weather-section').innerHTML = '';
  document.body.style.backgroundImage = '';
}

const changeGrades = (grade, min, temp, max) => {
  document.querySelector('.min-temp').textContent = `min: ${min}°${grade}`;
  document.querySelector('.main-temp').textContent = `${temp}°${grade}`;
  document.querySelector('.max-temp').textContent = `max: ${max}°${grade}`;
};

const changeBackgroud = (celcius) => {
  const weatherInfo = document.querySelector('.weather-info');
  if (celcius) {
    weatherInfo.classList.remove('fahrenheit');
    weatherInfo.classList.add('celcius');
  } else {
    weatherInfo.classList.remove('celcius');
    weatherInfo.classList.add('fahrenheit');
  }
}

function showWeather(w) {
  hiddenLoading();
  const wDesc = w.weather[0].description;
  const wIcon = w.weather[0].icon;
  const wImg = `http://openweathermap.org/img/wn/${wIcon}@2x.png`;
  const humidity = `${w.main.humidity} %`;
  const pressure = `${w.main.pressure} hPa`;

  // Grades in Celcius
  const tempC = Math.round(parseFloat(w.main.temp) - 273.15);
  const tempMaxC = Math.round(parseFloat(w.main.temp_max) - 273.15);
  const tempMinC = Math.round(parseFloat(w.main.temp_min) - 273.15);

  // Grades in Fahrenheit
  const tempF = Math.round(((parseFloat(w.main.temp) - 273.15) * 1.8) + 32);
  const tempMaxF = Math.round(((parseFloat(w.main.temp_max) - 273.15) * 1.8) + 32);
  const tempMinF = Math.round(((parseFloat(w.main.temp_min) - 273.15) * 1.8) + 32);

  const weatherSection = document.querySelector('#weather-section');
  weatherSection.innerHTML = `
    <label class="grades">Fahrenheit</label>
    <label class="switch">
      <input id="toggle-btn" type="checkbox" checked>
      <span class="slider round"></span>
    </label>
    <label class="grades">Celcius</label>
    <div class="weather-info row celcius">
      <div class="min-temp col-3">min: ${tempMinC}°C</div>
      <div class="main-temp col-6">${tempC}°C</div>
      <div class="max-temp col-3">max: ${tempMaxC}°C</div>
      <div class="desc-temp col-12">${wDesc}</div>
      <div class="humidity col-4">Humidity: ${humidity}</div>
      <picture class="image col-4">
        <img src="${wImg}">
      </picture>
      <div class="pressure col-4">Pressure: ${pressure}</div>
    </div>
  `;
  const id = wIcon.slice(0, 2);
  document.body.style.backgroundImage = `url('./images/${id}.gif')`;

  const toggleBtn = document.querySelector('#toggle-btn');
  toggleBtn.addEventListener('change', () => {
    if (toggleBtn.checked) {
      changeGrades('C', tempMinC, tempC, tempMaxC);
      changeBackgroud(toggleBtn.checked);
    } else {
      changeGrades('F', tempMinF, tempF, tempMaxF);
      changeBackgroud(toggleBtn.checked);
    }
  });
}


const setupWeather = async (city) => {
  clearWeatherInfo();
  if (city === '' || city.trim() === '' || city.length === 0) {
    hiddenLoading();
    return showMessage('Please, Enter a City');
  }
  await timeout(1000);
  const weatherInfo = await getWeatherInfo(city);
  if (weatherInfo === 404) {
    hiddenLoading();
    return showMessage('City not found');
  }
  return showWeather(weatherInfo);
};

const setupHeader = async () => {
  const header = document.querySelector('header');
  header.classList.add('container');

  const h1 = document.createElement('h1');
  h1.classList.add('main-header', 'text-center', 'py-3');
  h1.textContent = 'Weather App';
  header.appendChild(h1);
};

const setupMain = async () => {
  const main = document.querySelector('main');
  main.classList.add('container');

  const inputSection = document.createElement('section');
  inputSection.classList.add('input-section', 'row');

  const inputCity = document.createElement('input');
  inputCity.type = 'text';
  inputCity.placeholder = 'Enter a City';

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('btn', 'btn-info');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Search';
  submitBtn.addEventListener('click', () => setupWeather(inputCity.value));
  inputSection.appendChild(inputCity);
  inputSection.appendChild(submitBtn);

  inputCity.addEventListener('keyup', (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      submitBtn.click();
    }
  });

  const weatherSection = document.createElement('section');
  weatherSection.setAttribute('id', 'weather-section');
  weatherSection.classList.add('weather-section');

  const picture = document.createElement('picture');
  picture.setAttribute('id', 'loading-icon');
  picture.classList.add('loading-icon', 'row', 'hidden');
  picture.innerHTML = '<img src="./images/loading.gif" width="250" height="250" frameBorder="0" class="giphy-embed"></img>';

  main.appendChild(inputSection);
  main.appendChild(picture);
  main.appendChild(weatherSection);
};

const setupFooter = async () => {
  const footer = document.querySelector('footer');
  footer.classList.add('container', 'text-center');

  const spanFooter = document.createElement('span');
  spanFooter.textContent = 'Powered by ';

  const linkOpWe = document.createElement('a');
  linkOpWe.textContent = 'OpenWeather';
  linkOpWe.href = 'https://openweathermap.org/api';
  linkOpWe.target = '_blank';

  spanFooter.appendChild(linkOpWe);
  footer.appendChild(spanFooter);
};

export { setupHeader, setupMain, setupFooter };

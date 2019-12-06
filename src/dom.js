import { getWeatherInfo } from './weather.js';
export { setupHeader, setupMain, setupFooter }

const setupHeader = async () => {
  const header = document.querySelector('header');
  header.classList.add('container');

  const h1 = document.createElement('h1');
  h1.classList.add('main-header', 'text-center','py-3');
  h1.textContent = 'Weather App';
  header.appendChild(h1);
};

const setupMain = async () => {
  const main = document.querySelector('main');
  main.classList.add('container');

  const inputSection = document.createElement('section');
  inputSection.classList.add('input-section','row');

  const inputCity = document.createElement('input');
  inputCity.type = 'text';
  inputCity.placeholder = 'Enter a City';

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('btn', 'btn-info');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Search';
  submitBtn.addEventListener('click', () => { setupWeather(inputCity.value) });
  inputSection.appendChild(inputCity);
  inputSection.appendChild(submitBtn);

  const weatherSection = document.createElement('section');
  weatherSection.setAttribute('id','weather-section');
  weatherSection.classList.add('weather-section', 'row');

  const picture = document.createElement('picture');
  picture.setAttribute('id','loading-icon');
  picture.classList.add('loading-icon','row', 'hidden');
  picture.innerHTML = '<img src="./images/loading.gif" width="250" height="250" frameBorder="0" class="giphy-embed"></img>';

  main.appendChild(inputSection);
  main.appendChild(picture);
  main.appendChild(weatherSection);
};

const setupWeather = async (city) => {
  clearWeatherInfo();
  if (city == '') {
    hiddenLoading();
    return showMessage('Please, Enter a City');
  }
  await timeout(1000);
  const weatherInfo = await getWeatherInfo(city);
  if (weatherInfo == 404) {
    hiddenLoading();
    return showMessage('City not found');
  } else {
    return showWeather(weatherInfo);
  }
}

async function timeout(ms) {
  showLoading();
  await new Promise(resolve => setTimeout(resolve, ms));
}

function showLoading() {
  const picture = document.querySelector('#loading-icon');
  picture.classList.remove('hidden');
}

function hiddenLoading() {
  const picture = document.querySelector('#loading-icon');
  picture.classList.add('hidden');
}
function clearWeatherInfo() {
  const weatherSection = document.querySelector('#weather-section');
  weatherSection.innerHTML = '';
}
function showWeather(w){
  hiddenLoading();
  const w_desc = w.weather[0].description;
  const w_icon = w.weather[0].icon; 
  const w_img = `http://openweathermap.org/img/wn/${w_icon}@2x.png`;
  const humidity = `${w.main.humidity} %`;
  const pressure = `${w.main.pressure} hPa`;
  const tempC = Math.round(parseFloat(w.main.temp)-273.15);
  const tempMaxC = Math.round(parseFloat(w.main.temp_max)-273.15);
  const tempMinC = Math.round(parseFloat(w.main.temp_min)-273.15);
  
  // const celcius = Math.round(parseFloat(w.main.temp)-273.15);
  // const fahrenheit = Math.round(((parseFloat(w.main.temp)-273.15)*1.8)+32);
  
  const weatherSection = document.querySelector('#weather-section');
  weatherSection.innerHTML = `
    <div class="min-temp col-3">min: ${tempMinC}°C</div>
    <div class="main-temp col-6">${tempC}°C</div>
    <div class="max-temp col-3">max: ${tempMaxC}°C</div>
    <div class="desc-temp col-12">${w_desc}</div>
    <div class="humidity col-4">Humidity: ${humidity}</div>
    <picture class="image col-4">
      <img src="${w_img}">
    </picture>
    <div class="pressure col-4">Pressure: ${pressure}</div>
  `;
}
const setupFooter = async () => {
  const footer = document.querySelector('footer');
  footer.classList.add('container','text-center');

  const spanFooter = document.createElement('span');
  spanFooter.textContent = 'Powered by ';

  const linkOpWe = document.createElement('a');
  linkOpWe.textContent = 'OpenWeather';
  linkOpWe.href = 'https://openweathermap.org/api';
  linkOpWe.target = '_blank';

  spanFooter.appendChild(linkOpWe);
  footer.appendChild(spanFooter);
};

function showMessage(msg){
  window.alert(msg);
}
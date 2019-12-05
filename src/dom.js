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
  submitBtn.classList.add('btn', 'btn-success');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Search';
  submitBtn.addEventListener('click', () => { 
    console.log(inputCity.value)
  });
  inputSection.appendChild(inputCity);
  inputSection.appendChild(submitBtn);

  const weatherSection = document.createElement('section');
  weatherSection.classList.add('weather-section', 'row');

  main.appendChild(inputSection);
  main.appendChild(weatherSection);
};

const setupFooter = async () => {
  const footer = document.querySelector('footer');
  footer.classList.add('container','text-right');

  const spanFooter = document.createElement('span');
  spanFooter.textContent = 'Powered by ';

  const linkOpWe = document.createElement('a');
  linkOpWe.textContent = 'OpenWeather';
  linkOpWe.href = 'https://openweathermap.org/api';
  linkOpWe.target = '_blank';

  spanFooter.appendChild(linkOpWe);
  footer.appendChild(spanFooter);
};

export {setupHeader, setupMain, setupFooter}
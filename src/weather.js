/* eslint-disable linebreak-style */

async function checkStatus(status) {
  if (status === 200) {
    return true;
  }
  return false;
}

const getWeatherInfo = async (city) => {
  const API_KEY = 'c5cc87bec56b87798fd3626cd4001874';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
  const res = await fetch(url, { mode: 'cors' });
  const valid = await checkStatus(res.status);
  if (valid) {
    return res.json();
  }
  return res.status;
};

export { getWeatherInfo as default };

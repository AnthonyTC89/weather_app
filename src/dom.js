const setupHeader = async () => {
  console.log('Header')
  const header = document.querySelector('header');
  const h1 = document.createElement('h1');
  h1.classList.toggle('main-header');
  h1.textContent = 'Weather App';
  header.appendChild(h1);
};

const setupMain = async () => {
  console.log('Main')
  const main = document.querySelector('main');
};

const setupFooter = async () => {
  console.log('Footer')
  const footer = document.querySelector('footer');
};

export {setupHeader, setupMain, setupFooter}
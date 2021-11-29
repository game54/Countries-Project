'use strict';
let typeBool = true;
let counter = 0;
let index = 0;
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const resetBtn = document.querySelector('.reset');
const inputValue = document.querySelector('.input');
const ctrBtn = document.querySelector('.ctr');
const arrow = document.querySelector('.icon');
const inputBox = document.querySelector('.input-box');
const countries = [
  'Insert Country:',
  'Greece',
  'United States',
  'Insert Region:',
  'Americas',
  'Europe',
];

/////////////////////////////////////////

const renderSpinner = function (parentEl) {
  // <div class="spinner">
  //   <svg>
  //     <use href="<ion-icon name="sync-outline"></ion-icon>></use>
  //   </svg>
  // </div>
  const markup = `
  <div class="spinner">
  <div class="lds-dual-ring"></div>
   </div>
  `;
  // <div class="spinner">
  //  <ion-icon class="spinner__icon" name="sync-outline"
  //   >xxxxxxxx</ion-icon>
  //  </div>
  // `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
            <img class="country__img" src="${
              data.flag.includes('svg') ? data.flag : data.flags.svg
            }" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}m</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[Object.keys(data.languages)[0]]
              }${data.languages[Object.keys(data.languages)[1]] ? ',' : ''} ${
    data.languages[Object.keys(data.languages)[1]]
      ? data.languages[Object.keys(data.languages)[1]]
      : ''
  }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[Object.keys(data.currencies)[0]].name
              }</p>
              <p class="country__row"><span>🌆</span>${data.capital}</p>
            </div>
          </article>
          `;
  // inputBox.classList.remove('initial');
  // countriesContainer.innerHTML = '';
  countriesContainer.insertAdjacentHTML('beforeend', html);

  // setTimeout(function () {
  //   countriesContainer.style.opacity = 1;
  // }, 700);
};

const getCountryAndNeighbour = async function (country) {
  try {
    renderSpinner(countriesContainer);
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    if (!response.ok) throw new Error(`Country not found(${response.status})`);
    const [data] = await response.json();
    // console.log(data);
    // Render country 1
    countriesContainer.innerHTML = '';
    renderCountry(data);

    //Get neighbour country
    if (!data.borders) return;
    data.borders.forEach(async border => {
      // AJAX call country 2

      const request2 = await fetch(
        `https://restcountries.com/v3.1/alpha/${border}`
      );
      const [data2] = await request2.json();

      renderCountry(data2, 'neighbour');
    });
  } catch (err) {
    console.error(`${err}❌`);
    countriesContainer.innerHTML = '';
    arrow.style.color = '#f03e3e';
    inputBox.classList.add('error');

    setTimeout(() => {
      arrow.style.color = '#1971c2';
      inputBox.classList.remove('error');
      inputBox.classList.add('initial');
    }, 1000);
  }
};

const getRegion = async function (region) {
  renderSpinner(countriesContainer);
  const regions = await fetch(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const regionData = await regions.json();
  // console.log(regionData);

  countriesContainer.innerHTML = '';
  regionData.forEach(each => renderCountry(each));
};

const removeCountries = function () {
  const cr = document.querySelectorAll('.country');
  cr.forEach(each => each.remove());
};

const showResults = function () {
  inputBox.classList.remove('initial');
  typeBool = false;
  // countriesContainer.style.opacity = 0;
  setTimeout(function () {
    removeCountries();
    let input = inputValue.value;
    inputValue.value = '';
    arrow.classList.remove('flipper');
    input.toLowerCase() === 'asia' ||
    input.toLowerCase() === 'americas' ||
    input.toLowerCase() === 'europe' ||
    input.toLowerCase() === 'oceania' ||
    input.toLowerCase() === 'africa'
      ? getRegion(input)
      : getCountryAndNeighbour(input);
  }, 700);
};

// ctrBtn.addEventListener('click', showResults);
arrow.addEventListener('click', showResults);

inputValue.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') showResults();
});

inputValue.addEventListener('input', function (e) {
  if (inputValue.value != '') arrow.classList.add('flipper');
  if (inputValue.value == '') arrow.classList.remove('flipper');
});

const type = function () {
  let timeout = 200;
  inputValue.placeholder = countries[counter].slice(0, ++index);

  if (index === countries[counter].length) {
    index = 0;
    timeout = 2000;
    counter++;
    // console.log(typeBool);
  }

  if (counter === countries.length) counter = 0;
  if (typeBool === true) {
    setTimeout(type, timeout);
  }
  if (typeBool === false) {
    inputValue.placeholder = 'Country';
  }
};

document.addEventListener('DOMContentLoaded', type);

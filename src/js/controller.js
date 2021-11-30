'use strict';
import * as model from './model.js';
import countryView from './views/countryView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log(countryView);

let typeBool = true;
let counter = 0;
let index = 0;
// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');
const resetBtn = document.querySelector('.reset');
const inputValue = document.querySelector('.input');
// const ctrBtn = document.querySelector('.ctr');
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

// const renderCountry = function (data, className = '') {
// const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${
//             data.flag.includes('svg') ? data.flag : data.flags.svg
//           }" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}m</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[Object.keys(data.languages)[0]]
//             }${data.languages[Object.keys(data.languages)[1]] ? ',' : ''} ${
//   data.languages[Object.keys(data.languages)[1]]
//     ? data.languages[Object.keys(data.languages)[1]]
//     : ''
// }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[Object.keys(data.currencies)[0]].name
//             }</p>
//             <p class="country__row"><span>🌆</span>${data.capital}</p>
//           </div>
//         </article>
//         `;
// inputBox.classList.remove('initial');
// setTimeout(function () {
//   countriesContainer.style.opacity = 1;
// }, 700);
// };

const getCountryAndNeighbour = async function (country) {
  try {
    const inputCountry = inputValue.value;

    //loading spinner
    countryView.renderSpinner();

    //loading country
    await model.loadCountry(inputCountry);

    //rendering country
    countryView.renderCountry(model.state.country);

    //loading neighbour countries
    await model.loadNeighbour();

    //render neighbour countries
    model.state.neighbour.results.flat().map(result => {
      console.log(result);
      countryView.renderNeighbour(result, 'neighbour');
    });
  } catch (err) {
    console.error(`${err}❌`);

    //React to error
    countryView.errorReaction();
  }
};

// const getRegion = async function (region) {
//   renderSpinner(countriesContainer);
//   const regions = await fetch(
//     `https://restcountries.com/v3.1/region/${region}`
//   );
//   const regionData = await regions.json();
//   // console.log(regionData);

//   countriesContainer.innerHTML = '';
//   regionData.forEach(each => renderCountry(each));
// };

const showResults = function () {
  inputBox.classList.remove('initial');
  typeBool = false;
  // countriesContainer.style.opacity = 0;
  // setTimeout(function () {
  // removeCountries();
  let input = inputValue.value;
  getCountryAndNeighbour(input);
  // inputValue.value = '';
  // arrow.classList.remove('flipper');
  // input.toLowerCase() === 'asia' ||
  // input.toLowerCase() === 'americas' ||
  // input.toLowerCase() === 'europe' ||
  // input.toLowerCase() === 'oceania' ||
  // input.toLowerCase() === 'africa'
  //   ? getRegion(input)
  //   getCountryAndNeighbour(input);
  // }, 700);
};

countryView.addHandlerClick(showResults);
countryView.addHandlerEnter(showResults);

// inputValue.addEventListener('input', function (e) {
//   if (inputValue.value != '') arrow.classList.add('flipper');
//   if (inputValue.value == '') arrow.classList.remove('flipper');
// });
countryView.addHandlerFlipper();

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

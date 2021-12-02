import { func } from 'assert-plus';
import { TYPE_COUNTRIES } from './config.js';

export const state = {
  country: {},
  neighbour: {
    results: [],
  },
  region: {
    results: [],
  },
  countries: TYPE_COUNTRIES,
};

export const loadCountry = async function (country) {
  try {
    state.country = {};
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    if (!response.ok) throw new Error(`Country not found(${response.status})`);
    const [data] = await response.json();

    state.country = data;

    console.log(state.country);
  } catch (err) {
    console.log(err);
  }
};

export const loadNeighbour = async function () {
  try {
    const x = [];
    state.neighbour.results = [];
    if (!state.country.borders) return;

    console.log(state.country.borders);

    state.country.borders.map(border => {
      x.push(fetch(`https://restcountries.com/v3.1/alpha/${border}`));
    });

    const response = await Promise.all(x);

    for (let i = 0; i < response.length; i++) {
      state.neighbour.results[i] = await response[i].json();
    }
    state.neighbour.results.flat();
  } catch (err) {
    console.log(err);
  }
};

export const loadRegion = async function (region) {
  try {
    state.region.results = [];
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );

    const data = await response.json();

    state.region.results = data;
  } catch (err) {
    console.log(err);
  }
};

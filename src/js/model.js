import { func } from 'assert-plus';
import { TYPE_COUNTRIES, API_URL_VERSION } from './config.js';

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
      `${API_URL_VERSION}name/${country}?fullText=true`
    );
    if (!response.ok) throw new Error(`Country not found(${response.status})`);
    const [data] = await response.json();

    state.country = data;
  } catch (err) {
    console.error(err);
  }
};

export const loadNeighbour = async function () {
  try {
    const result = [];
    state.neighbour.results = [];
    if (!state.country.borders) return;

    state.country.borders.map(border => {
      result.push(fetch(`${API_URL_VERSION}alpha/${border}`));
    });

    const response = await Promise.all(result);

    for (let i = 0; i < response.length; i++) {
      state.neighbour.results[i] = await response[i].json();
    }
    state.neighbour.results.flat();
  } catch (err) {
    console.error(err);
  }
};

export const loadRegion = async function (region) {
  try {
    state.region.results = [];
    const response = await fetch(`${API_URL_VERSION}region/${region}`);

    const data = await response.json();

    state.region.results = data;
  } catch (err) {
    console.error(err);
  }
};

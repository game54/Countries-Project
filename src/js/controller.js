'use strict';
import * as model from './model.js';
import countryView from './views/countryView.js';
import handlers from './views/handlers.js';
import regionView from './views/regionView.js';
import neighbourView from './views/neighbourView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const getCountryAndNeighbour = async function (country) {
  try {
    const inputCountry = countryView._inputValue.value;

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
      neighbourView.renderNeighbour(result, 'neighbour');
    });
  } catch (err) {
    console.error(`${err}❌`);

    //React to error
    countryView.errorReaction();
  }
};

const getCountryByRegion = async function (region) {
  try {
    const inputRegion = countryView._inputValue.value;

    // loading spinner
    countryView.renderSpinner();

    //load region
    await model.loadRegion(inputRegion);

    //clear html
    countryView._clear();

    //render region countries
    model.state.region.results.map(result => {
      regionView.renderRegion(result, model.state.region.results.length);
    });
  } catch (err) {
    console.error(`${err}❌`);

    //React to error
    countryView.errorReaction();
  }
};

const showResults = function () {
  const input = countryView._inputValue.value;
  countryView.removeInitial();
  // stops auto-type
  handlers._typeBool = false;
  //clear html
  countryView._clear();

  regionView._isRegion()
    ? getCountryByRegion(input)
    : getCountryAndNeighbour(input);
};

const init = function () {
  handlers.addHandlerClick(showResults);
  handlers.addHandlerEnter(showResults);
  handlers.addHandlerFlipper();
  handlers.addHandlerTyping(model.state.countries);
};
init();

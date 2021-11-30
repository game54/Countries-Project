class CountryView {
  _parentElement = document.querySelector('.countries');
  _arrow = document.querySelector('.icon');
  _inputBox = document.querySelector('.input-box');
  _inputValue = document.querySelector('.input');
  _country;
  _neighbour;
  _className;

  renderCountry(data) {
    this._country = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
    // this._neighbour = data;
  }

  _generateMarkup() {
    return `
          <article class="country">
            <img class="country__img" src="${
              this._country.flag.includes('svg')
                ? this._country.flag
                : this._country.flags.svg
            }" />
            <div class="country__data">
              <h3 class="country__name">${this._country.name.common}</h3>
              <h4 class="country__region">${this._country.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +this._country.population / 1000000
              ).toFixed(1)}m</p>
              <p class="country__row"><span>🗣️</span>${
                this._country.languages[Object.keys(this._country.languages)[0]]
              }${
      this._country.languages[Object.keys(this._country.languages)[1]]
        ? ','
        : ''
    } ${
      this._country.languages[Object.keys(this._country.languages)[1]]
        ? this._country.languages[Object.keys(this._country.languages)[1]]
        : ''
    }</p>
              <p class="country__row"><span>💰</span>${
                this._country.currencies[
                  Object.keys(this._country.currencies)[0]
                ].name
              }</p>
              <p class="country__row"><span>🌆</span>${
                this._country.capital
              }</p>
            </div>
          </article>
          `;
  }

  renderNeighbour(data, className) {
    this._neighbour = data;
    this._className = className;
    const html = this._generateMarkupNeighbour();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  _generateMarkupNeighbour() {
    return `
          <article class="country ${this._className}">
            <img class="country__img" src="${
              this._neighbour.flag.includes('svg')
                ? this._neighbour.flag
                : this._neighbour.flags.svg
            }" />
            <div class="country__data">
              <h3 class="country__name">${this._neighbour.name.common}</h3>
              <h4 class="country__region">${this._neighbour.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +this._neighbour.population / 1000000
              ).toFixed(1)}m</p>
              <p class="country__row"><span>🗣️</span>${
                this._neighbour.languages[
                  Object.keys(this._neighbour.languages)[0]
                ]
              }${
      this._neighbour.languages[Object.keys(this._neighbour.languages)[1]]
        ? ','
        : ''
    } ${
      this._neighbour.languages[Object.keys(this._neighbour.languages)[1]]
        ? this._neighbour.languages[Object.keys(this._neighbour.languages)[1]]
        : ''
    }</p>
              <p class="country__row"><span>💰</span>${
                this._neighbour.currencies[
                  Object.keys(this._neighbour.currencies)[0]
                ].name
              }</p>
              <p class="country__row"><span>🌆</span>${
                this._neighbour.capital
              }</p>
            </div>
          </article>
          `;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <div class="lds-dual-ring"></div>
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  errorReaction() {
    this._clear();
    this._arrow.style.color = '_f03e3e';
    this._inputBox.classList.add('error');

    setTimeout(() => {
      this._arrow.style.color = '_1971c2';
      this._inputBox.classList.remove('error');
      // this._inputBox.classList.add('initial');
    }, 1000);
  }

  addHandlerClick(handler) {
    this._arrow.addEventListener('click', handler);
  }

  addHandlerEnter(handler) {
    this._inputValue.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handler();
    });
  }

  addHandlerFlipper() {
    this._inputValue.addEventListener('input', e => {
      if (e.target.value != '') this._arrow.classList.add('flipper');
      if (e.target.value == '') this._arrow.classList.remove('flipper');
    });
  }
}

export default new CountryView();

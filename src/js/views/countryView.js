import View from './view';

class CountryView extends View {
  _country;

  renderCountry(data) {
    this._country = data;
    const html = this._generateMarkup();
    this._clear();
    this._clearInput();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  _generateMarkup() {
    return `
          <article class="country">
            <img class="country__img" src="${this._country.flags.svg}" />
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
}

export default new CountryView();

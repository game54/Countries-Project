import View from './view';

class Region extends View {
  _region;

  renderRegion(data) {
    if (!data) return;
    this._region = data;
    this._clearInput();
    const html = this._generateMarkupRegion();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  _isRegion() {
    if (
      this._inputValue.value.toLowerCase() === 'asia' ||
      this._inputValue.value.toLowerCase() === 'americas' ||
      this._inputValue.value.toLowerCase() === 'europe' ||
      this._inputValue.value.toLowerCase() === 'oceania' ||
      this._inputValue.value.toLowerCase() === 'africa'
    ) {
      return true;
    } else return false;
  }

  _generateMarkupRegion() {
    return `
          <article class="country">
            <img class="country__img" src="${this._region.flags.svg}" />
            <div class="country__data">
              <h3 class="country__name">${this._region.name.common}</h3>
              <h4 class="country__region">${this._region.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +this._region.population / 1000000
              ).toFixed(1)}m</p>
              <p class="country__row"><span>🗣️</span>${
                this._region.languages[Object.keys(this._region.languages)[0]]
              }${
      this._region.languages[Object.keys(this._region.languages)[1]] ? ',' : ''
    } ${
      this._region.languages[Object.keys(this._region.languages)[1]]
        ? this._region.languages[Object.keys(this._region.languages)[1]]
        : ''
    }</p>
              <p class="country__row"><span>💰</span>${
                this._region.currencies[Object.keys(this._region.currencies)[0]]
                  .name
              }</p>
              <p class="country__row"><span>🌆</span>${this._region.capital}</p>
            </div>
          </article>
          `;
  }
}

export default new Region();

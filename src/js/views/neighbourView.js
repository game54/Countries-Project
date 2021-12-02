import View from './view';

class NeighbourView extends View {
  _neighbour;
  _className;

  renderNeighbour(data, className) {
    this._neighbour = data;
    this._className = className;
    const html = this._generateMarkupNeighbour();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  _generateMarkupNeighbour() {
    return `
          <article class="country ${this._className}">
            <img class="country__img" src="${this._neighbour.flags.svg}" />
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
}

export default new NeighbourView();

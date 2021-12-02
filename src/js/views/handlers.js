import View from './view';

class Handlers extends View {
  _typeBool = true;
  _counter = 0;
  _index = 0;
  _countries = [];

  type(data) {
    let timeout = 200;
    this._inputValue.placeholder = this._countries[this._counter].slice(
      0,
      ++this._index
    );

    if (this._index === this._countries[this._counter].length) {
      this._index = 0;
      timeout = 2000;
      this._counter++;
    }

    if (this._counter === this._countries.length) this._counter = 0;

    this._typeBool === true
      ? setTimeout(() => {
          this.type();
        }, timeout)
      : (this._inputValue.placeholder = 'Country');
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
  addHandlerTyping(data) {
    document.addEventListener('DOMContentLoaded', () => {
      this._countries = data;
      this.type();
    });
  }
}

export default new Handlers();

export default class View {
  _parentElement = document.querySelector('.countries');
  _arrow = document.querySelector('.icon');
  _inputBox = document.querySelector('.input-box');
  _inputValue = document.querySelector('.input');

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _clearInput() {
    this._inputValue.value = '';
  }

  removeInitial() {
    this._inputBox.classList.remove('initial');
  }
  addInitial() {
    this._inputBox.classList.add('initial');
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
      this._inputBox.classList.add('initial');
    }, 1000);
  }
}

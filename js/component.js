'use strict';

class Component {
  constructor(options) {
    this._el = options.element;
  }

  getElement() {
    return this._el;
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  show(phoneDetails) {
    this._el.classList.remove('js-hidden');
  }
}
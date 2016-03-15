"use strict";

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;
    this._phones = options.phones;

    this._template = document.getElementById('phone-catalogue-template').innerHTML;

    this._el.addEventListener('click', this._onPhoneClick);

    this._render();
  }

  _onPhoneClick(event) {
    var currentItem = event.target.closest('[data-selector="menu-item"]');

    if (!currentItem) {
      return;
    }

    alert(currentItem.dataset.id);
  }

  _render() {
    this._el.innerHTML = _.template(this._template)({
      title: 'PHones to sell',
      phones: this._phones
    });
  }
}
"use strict";

let Component = require('./component.js');
let templateFunction = require('./../templates/phone-catalogue-template.hbs');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._onMouseOut = this._onMouseOut.bind(this);

    this._el.addEventListener('click', this._onPhoneClick.bind(this));
  }

  render(phones) {
    this._el.innerHTML = templateFunction({
      title: 'PHones to sell',
      phones: phones
    });
  }

  _onPhoneClick(event) {
    var link = event.target.closest('[data-selector="openTrigger"]');

    this._selectedItem = event.target.closest('[data-selector="phoneItemContainer"]');

    if (!link) {
      return;
    }

    var phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.phoneId;

    this._el.addEventListener('mouseout', this._onMouseOut);

    this._trigger('phoneSelected', phoneId);
  }

  _onMouseOut(event) { // 010100  010000
    var isMovedOut = !event.relatedTarget
      || !(
        event.relatedTarget === this._selectedItem
        ||
        this._selectedItem.compareDocumentPosition(event.relatedTarget) & 16
      );

    if (!isMovedOut) {
      return;
    }

    this._el.removeEventListener('mouseout', this._onMouseOut);

    this._trigger('mouseLeft');
  }
}

module.exports = PhoneCatalogue;



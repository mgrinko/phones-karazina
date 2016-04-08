"use strict";

let Component = require('./component.js');
let templateFunction = require('./../templates/phone-catalogue-template.hbs');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = options.phones;

    this._el.addEventListener('click', this._onPhoneClick.bind(this));

    this.render(this._phones);
  }

  render(phones) {
    this._el.innerHTML = templateFunction({
      title: 'PHones to sell',
      phones: phones
    });
  }

  _onPhoneClick(event) {
    var link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    var phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.phoneId;

    this._trigger('phoneSelected', phoneId);
  }

}

module.exports = PhoneCatalogue;



"use strict";

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = options.phones;
    this._template = document.getElementById('phone-catalogue-template').innerHTML;

    this._el.addEventListener('click', this._onPhoneClick.bind(this));

    this._render();
  }

  _onPhoneClick(event) {
    var link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    var phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.phoneId;

    this._triggerPhoneSelected(phoneId);
  }

  _triggerPhoneSelected(phoneId) {
    let event = new CustomEvent('phoneSelected', {
      detail: phoneId
    });

    this._el.dispatchEvent(event);
  }

  _render() {
    this._el.innerHTML = _.template(this._template)({
      title: 'PHones to sell',
      phones: this._phones
    });
  }
}
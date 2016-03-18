"use strict";

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = options.phones;
    this._template = document.getElementById('phone-catalogue-template').innerHTML;

    this._el.addEventListener('click', this._onPhoneClick.bind(this));

    this.render(this._phones);
  }

  render(phones) {
    this._el.innerHTML = _.template(this._template)({
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
'use strict';

let Component = require('./component.js');
let templateFunction = require('./../templates/phone-viewer-template.hbs');

class PhoneViewer extends Component {
  constructor(options) {
    super(options);

    this._el.addEventListener('click', this._onBackClick.bind(this));
  }

  show(phoneDetails) {
    this._el.innerHTML = templateFunction({
      phone: phoneDetails
    });

    super.show();
  }

  _onBackClick(event) {
    let backButton = event.target.closest('[data-selector="backButton"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }
}

module.exports = PhoneViewer;

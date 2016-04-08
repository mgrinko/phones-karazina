"use strict";

let Filter = require('./filter.js');
let PhoneViewer = require('./phoneViewer.js');
let PhoneCatalogue = require('./phoneCatalogue.js');

class Page {
  constructor(options) {
    this._el = options.element;
    this._loadPhones();

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._phoneCatalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._phoneViewer.on('back', this._onPhoneViewerBack.bind(this));
    this._filter.on('filterChange', this._onFilterChange.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._showPhoneDetails(phoneId);
  }

  _onPhoneViewerBack() {
    this._phoneViewer.hide();
    this._phoneCatalogue.show();
  }

  _onFilterChange(event) {
    let query = event.detail;
    let filteredPhones = this._loadPhones(query);

    this._phoneCatalogue.render(filteredPhones);
  }

  _loadPhones(query = '') {
    let normalizedQuery = query.toLowerCase().trim();

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/data/phones.json', true);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        var phones = JSON.parse(xhr.responseText);

        this._phoneCatalogue.render(phones);
      }
    };



    //return phones.filter(function(phone) {
    //  return phone.name.toLowerCase().indexOf(normalizedQuery) > -1;
    //});
  }

  _showPhoneDetails(phoneId) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', `/data/phones/${phoneId}.json`, true);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        var phoneDetails = JSON.parse(xhr.responseText);

        this._phoneViewer.show(phoneDetails);
        this._phoneCatalogue.hide();
      }
    };

  }
}

module.exports = Page;






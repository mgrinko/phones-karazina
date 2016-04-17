"use strict";

let AjaxService = require('./ajaxService.js');
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
    let ajaxPromise = AjaxService.ajax(`/data/phones/${phoneId}.json`);
    let mouseOutPromise = this._getMouseOutPromise();

    mouseOutPromise
      .then(function() {
        return ajaxPromise;
      })
      .then(function(details) {
        this._showPhoneDetails(details);
      }.bind(this), function(error) {
        console.error(error);
      })
      .catch(function(error) {
        console.error(error);
      })


    Promise.all([mouseOutPromise, ajaxPromise])
      .then(function(results) {
        this._showPhoneDetails(results[1]);
      }, function(error) {
        console.error(error);
      });


  }

  _getMouseOutPromise() {
    var promise  = new Promise(function(resolve, reject) {
      this._phoneCatalogue.on('mouseLeft', () => {
        resolve();
      });
    }.bind(this));
  }

  _showPhoneDetails(details) {
    this._phoneViewer.show(details);
    this._phoneCatalogue.hide();
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

    AjaxService.ajax('/data/phones.json', {
      success: function(phones) {
        this._phoneCatalogue.render(phones);
      }.bind(this),

      error: function(error) {
        console.log(error);
      }
    });
  }
}

module.exports = Page;






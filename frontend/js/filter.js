"use strict";

let Component = require('./component.js');

class Filter extends Component {
  constructor(options) {
    super(options);

    this._field = this._el.querySelector('[data-selector="field"]');

    this._field.oninput = this._onChange.bind(this);
  }

  _onChange() {
    this._trigger('filterChange', this._field.value);
  }
}

module.exports = Filter;

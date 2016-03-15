"use strict";

function Search(options) {
  this.__proto__ = Search.prototype;
  this._el = options.element;

  this._el.innerHTML = '<input type="text"/>';
}
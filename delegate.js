'use strict';

var events = require("events");
var util = require("util");

module.exports = function (dest, src) {
  var propName;
  for (var _propName in src) {
    propName = _propName;
    if (typeof(src[propName]) === 'function') {
      createFunction(dest, src, propName, src[propName]);
    }
  }
};

function createFunction(dest, src, name, fn) {
  dest[name] = function () {
    fn.apply(src, arguments, src);
  };
}

module.exports.EventEmitter = function () {
  events.EventEmitter.call(this);
};
util.inherits(module.exports.EventEmitter, events.EventEmitter);

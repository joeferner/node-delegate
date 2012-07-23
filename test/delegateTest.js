'use strict';

var delegate = require('../');
var util = require("util");
var events = require("events");
var Class = require('class.js');

module.exports = {
  "delegate EventEmitter": function (test) {
    var MyClass = function () {
      this.evtEmitter = new delegate.EventEmitter();
      delegate(this, this.evtEmitter);
    };

    MyClass.prototype.emitTestEvent = function () {
      this.emit("test");
    };

    var obj = new MyClass();
    obj.on("test", function () {
      test.done();
    });
    assertIsEventEmitter(test, obj);
    obj.emitTestEvent();
  },

  "delegate class.js": function (test) {
    var A = Class({
      init: function () {
        this.evtEmitter = new delegate.EventEmitter();
        delegate(this, this.evtEmitter);
      }
    });

    var B = A.extend({
      emitTestEvent: function () {
        this.emit("test");
      }
    });

    var obj = new B();
    obj.on("test", function () {
      test.done();
    });
    assertIsEventEmitter(test, obj);
    obj.emitTestEvent();
  }
};

function getKeys(obj) {
  var result = [];
  for (var o in result) {
    result.push(o);
  }
  return result;
}

function assertIsEventEmitter(test, obj) {
  for (var k in events.EventEmitter.prototype) {
    test.ok(obj[k], 'could not find ' + k + ' function');
  }
}
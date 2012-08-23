[![build status](https://secure.travis-ci.org/nearinfinity/node-delegate.png)](http://travis-ci.org/nearinfinity/node-delegate)
# delegate

Creates delegate functions automatically. This is useful if you don't want to use util.inherits.

## Example

Simple example.

```javascript
var A = function() {
  this.evtEmitter = new delegate.EventEmitter();
  delegate(this, this.evtEmitter);
};

var obj = new A();
obj.on("test", function (data) {
  // read data
});
```

Example using class.js module.

```javascript
var delegate = require('delegate');
var Class = require('class.js');

var MyEventEmitter = function () {
  events.EventEmitter.call(this);
};
util.inherits(MyEventEmitter, events.EventEmitter);

var A = Class({
  init: function () {
    this.evtEmitter = new MyEventEmitter();
    delegate(this, this.evtEmitter);
  }
});

var B = A.extend({
  emitDataEvent: function () {
    this.emit("data", 'hello world');
  }
});

var obj = new B();
obj.on("test", function (data) {
  // read data
});
```

## API

### delegate(destObj, srcObj)

Creates delegate functions for each function found on srcObj on destObj.

__Arguments__

 * destObj - The object you want the delegate function to exist on.
 * srcObj - The object you want to create delegate functions to.

### delegate.EventEmitter

Convenience class the implements events.EventEmitter that you can delegate to.


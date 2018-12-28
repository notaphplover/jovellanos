(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jovellanos = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenMap = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var TokenMap =
/*#__PURE__*/
function () {
  function TokenMap() {
    (0, _classCallCheck2.default)(this, TokenMap);
    this.innerMap = new Map();
    this.unusedIndexes = new Array();
  }

  (0, _createClass2.default)(TokenMap, [{
    key: "add",
    value: function add(elem) {
      if (0 === this.unusedIndexes.length) {
        var lastIndex = this.innerMap.size;
        this.innerMap.set(lastIndex, elem);
        return lastIndex;
      } else {
        var _lastIndex = this.unusedIndexes[this.unusedIndexes.length - 1];
        --this.unusedIndexes.length;
        this.innerMap.set(_lastIndex, elem);
        return _lastIndex;
      }
    }
  }, {
    key: "count",
    value: function count() {
      return this.innerMap.size;
    }
  }, {
    key: "foreach",
    value: function foreach(consumer) {
      this.innerMap.forEach(function (value, key) {
        consumer(value, key);
      });
    }
  }, {
    key: "get",
    value: function get(index) {
      return this.innerMap.get(index);
    }
  }, {
    key: "remove",
    value: function remove(index) {
      if (this.innerMap.has(index)) {
        this.innerMap.delete(index);
        this.unusedIndexes[this.unusedIndexes.length] = index;
        return true;
      } else {
        return false;
      }
    }
  }]);
  return TokenMap;
}();

exports.TokenMap = TokenMap;

},{"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/createClass":15,"@babel/runtime/helpers/interopRequireDefault":18}],2:[function(require,module,exports){
"use strict";

var _taskPartBeginConstraint = require("./task/flow/task-part-begin-constraint");

var _taskPartEndConstraint = require("./task/flow/task-part-end-constraint");

var _taskPartGroupConstraint = require("./task/flow/task-part-group-constraint");

var _taskPartTimeConstraint = require("./task/flow/task-part-time-constraint");

var _operationManager = require("./task/operation/operation-manager");

var _taskEngine = require("./task/task-engine");

var _taskPartWhenEvents = require("./task/task-part-when-events");

var _taskPartWhenOperator = require("./task/task-part-when-operator");

var jovellanos = {
  task: {
    TASK_PART_WHEN_EVENTS: _taskPartWhenEvents.TASK_PART_WHEN_EVENTS,
    TaskEngine: _taskEngine.TaskEngine,
    TaskPartWhenOperator: _taskPartWhenOperator.TaskPartWhenOperator,
    flow: {
      TaskGroupConstraint: _taskPartGroupConstraint.TaskGroupConstraint,
      TaskPartBeginConstraint: _taskPartBeginConstraint.TaskPartBeginConstraint,
      TaskPartEndConstraint: _taskPartEndConstraint.TaskPartEndConstraint,
      TaskTimeConstraint: _taskPartTimeConstraint.TaskTimeConstraint
    },
    operation: {
      OperationManager: _operationManager.OperationManager
    }
  }
};
module.exports = jovellanos;

},{"./task/flow/task-part-begin-constraint":4,"./task/flow/task-part-end-constraint":6,"./task/flow/task-part-group-constraint":7,"./task/flow/task-part-time-constraint":8,"./task/operation/operation-manager":9,"./task/task-engine":10,"./task/task-part-when-events":11,"./task/task-part-when-operator":12}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPartWhenConstraint = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var TaskPartWhenConstraint = function TaskPartWhenConstraint(after, constraintType) {
  (0, _classCallCheck2.default)(this, TaskPartWhenConstraint);
  this.after = after;
  this.constraintType = constraintType;
};

exports.TaskPartWhenConstraint = TaskPartWhenConstraint;

},{"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/interopRequireDefault":18}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPartBeginConstraint = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taskPartConstraint = require("./task-part-constraint");

var TaskPartBeginConstraint =
/*#__PURE__*/
function (_TaskPartConstraint) {
  (0, _inherits2.default)(TaskPartBeginConstraint, _TaskPartConstraint);

  function TaskPartBeginConstraint(after, alias) {
    (0, _classCallCheck2.default)(this, TaskPartBeginConstraint);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TaskPartBeginConstraint).call(this, after, alias, _taskPartConstraint.TASK_CONSTRAINT_TYPES.START));
  }

  return TaskPartBeginConstraint;
}(_taskPartConstraint.TaskPartConstraint);

exports.TaskPartBeginConstraint = TaskPartBeginConstraint;

},{"./task-part-constraint":5,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":19}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPartConstraint = exports.TASK_CONSTRAINT_TYPES = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taskFlowWhen = require("./task-flow-when");

var TASK_CONSTRAINT_TYPES = {
  END: 'anim.end',
  GROUP: 'group',
  START: 'anim.start',
  WAIT_FOR: 'wait'
};
exports.TASK_CONSTRAINT_TYPES = TASK_CONSTRAINT_TYPES;

var TaskPartConstraint =
/*#__PURE__*/
function (_TaskPartWhenConstrai) {
  (0, _inherits2.default)(TaskPartConstraint, _TaskPartWhenConstrai);

  function TaskPartConstraint(after, alias, constraintType) {
    var _this;

    (0, _classCallCheck2.default)(this, TaskPartConstraint);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TaskPartConstraint).call(this, after, constraintType));
    _this.alias = alias;
    return _this;
  }

  return TaskPartConstraint;
}(_taskFlowWhen.TaskPartWhenConstraint);

exports.TaskPartConstraint = TaskPartConstraint;

},{"./task-flow-when":3,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":19}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPartEndConstraint = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taskPartConstraint = require("./task-part-constraint");

var TaskPartEndConstraint =
/*#__PURE__*/
function (_TaskPartConstraint) {
  (0, _inherits2.default)(TaskPartEndConstraint, _TaskPartConstraint);

  function TaskPartEndConstraint(after, alias) {
    (0, _classCallCheck2.default)(this, TaskPartEndConstraint);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TaskPartEndConstraint).call(this, after, alias, _taskPartConstraint.TASK_CONSTRAINT_TYPES.END));
  }

  return TaskPartEndConstraint;
}(_taskPartConstraint.TaskPartConstraint);

exports.TaskPartEndConstraint = TaskPartEndConstraint;

},{"./task-part-constraint":5,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":19}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskGroupConstraint = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taskFlowWhen = require("./task-flow-when");

var _taskPartConstraint = require("./task-part-constraint");

var TaskGroupConstraint =
/*#__PURE__*/
function (_TaskPartWhenConstrai) {
  (0, _inherits2.default)(TaskGroupConstraint, _TaskPartWhenConstrai);

  function TaskGroupConstraint(after, constraints, operator) {
    var _this;

    (0, _classCallCheck2.default)(this, TaskGroupConstraint);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TaskGroupConstraint).call(this, after, _taskPartConstraint.TASK_CONSTRAINT_TYPES.GROUP));
    _this.constraints = constraints;
    _this.operator = operator;
    return _this;
  }

  return TaskGroupConstraint;
}(_taskFlowWhen.TaskPartWhenConstraint);

exports.TaskGroupConstraint = TaskGroupConstraint;

},{"./task-flow-when":3,"./task-part-constraint":5,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":19}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskTimeConstraint = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taskFlowWhen = require("./task-flow-when");

var _taskPartConstraint = require("./task-part-constraint");

var TaskTimeConstraint =
/*#__PURE__*/
function (_TaskPartWhenConstrai) {
  (0, _inherits2.default)(TaskTimeConstraint, _TaskPartWhenConstrai);

  function TaskTimeConstraint(after, millis) {
    var _this;

    (0, _classCallCheck2.default)(this, TaskTimeConstraint);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TaskTimeConstraint).call(this, after, _taskPartConstraint.TASK_CONSTRAINT_TYPES.WAIT_FOR));
    _this.millis = millis;
    return _this;
  }

  return TaskTimeConstraint;
}(_taskFlowWhen.TaskPartWhenConstraint);

exports.TaskTimeConstraint = TaskTimeConstraint;

},{"./task-flow-when":3,"./task-part-constraint":5,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":19}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationManager = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _tokenMap = require("../../collection/token-map");

var OperationManager =
/*#__PURE__*/
function () {
  function OperationManager(eventAlias, eventEmitter) {
    (0, _classCallCheck2.default)(this, OperationManager);
    var that = this;

    this.callFunction = function (eventArgs) {
      if (eventArgs.aliases == null) {
        for (var alias in that.subscriptionStorage) {
          if (that.subscriptionStorage.hasOwnProperty(alias)) {
            var subscribers = that.subscriptionStorage[alias];

            if (subscribers != null) {
              subscribers.foreach(function (value) {
                value(eventArgs);
              });
            }
          }
        }
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = eventArgs.aliases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _alias = _step.value;
            var _subscribers = that.subscriptionStorage[_alias];

            if (_subscribers != null) {
              _subscribers.foreach(function (value) {
                value(eventArgs);
              });
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    };

    this.eventAlias = eventAlias;
    this.eventEmitter = eventEmitter;
    this.subscriptionStorage = {};
    this.eventEmitter.addListener(this.eventAlias, this.callFunction);
  }

  (0, _createClass2.default)(OperationManager, [{
    key: "dispose",
    value: function dispose() {
      this.eventEmitter.removeListener(this.eventAlias, this.callFunction);
    }
  }, {
    key: "subscribe",
    value: function subscribe(alias, handler) {
      if (null == this.subscriptionStorage[alias]) {
        this.subscriptionStorage[alias] = new _tokenMap.TokenMap();
      }

      return this.subscriptionStorage[alias].add(handler);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(alias, index) {
      if (null == this.subscriptionStorage[alias]) {
        return false;
      } else {
        return this.subscriptionStorage[alias].remove(index);
      }
    }
  }]);
  return OperationManager;
}();

exports.OperationManager = OperationManager;

},{"../../collection/token-map":1,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/createClass":15,"@babel/runtime/helpers/interopRequireDefault":18}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskEngine = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _events = require("events");

var _taskPartConstraint = require("./flow/task-part-constraint");

var _operationManager = require("./operation/operation-manager");

var _taskPartWhenEvents = require("./task-part-when-events");

var _taskPartWhenOperator = require("./task-part-when-operator");

var TaskEngine =
/*#__PURE__*/
function () {
  function TaskEngine() {
    (0, _classCallCheck2.default)(this, TaskEngine);
    this.eventEmitter = new _events.EventEmitter();
    this.partEndManager = new _operationManager.OperationManager(_taskPartWhenEvents.TASK_PART_WHEN_EVENTS.END, this.eventEmitter);
    this.partStartManager = new _operationManager.OperationManager(_taskPartWhenEvents.TASK_PART_WHEN_EVENTS.START, this.eventEmitter);
  }

  (0, _createClass2.default)(TaskEngine, [{
    key: "getPartEndListenerAccess",
    value: function getPartEndListenerAccess() {
      var that = this;
      return {
        subscribe: function subscribe(alias, handler) {
          return that.partEndManager.subscribe(alias, handler);
        },
        unsubscribe: function unsubscribe(alias, index) {
          return that.partEndManager.unsubscribe(alias, index);
        }
      };
    }
  }, {
    key: "getPartStartListenerAccess",
    value: function getPartStartListenerAccess() {
      var that = this;
      return {
        subscribe: function subscribe(alias, handler) {
          return that.partStartManager.subscribe(alias, handler);
        },
        unsubscribe: function unsubscribe(alias, index) {
          return that.partStartManager.unsubscribe(alias, index);
        }
      };
    }
  }, {
    key: "handle",
    value: function handle(taskFlow) {
      if (taskFlow == null) {
        throw new Error('It\'s required a task flow.');
      }

      if (taskFlow.parts == null) {
        throw new Error('It\'s required a task flow with parts.');
      }

      this.currentTask = taskFlow;
      var partPromises = new Array(taskFlow.parts.length);

      for (var i = 0; i < taskFlow.parts.length; ++i) {
        partPromises[i] = this.handleTaskPart(taskFlow.parts[i]);
      }

      return partPromises;
    }
  }, {
    key: "handleTaskPart",
    value: function handleTaskPart(part) {
      var that = this;
      return new Promise(function (resolve, reject) {
        that.handleTaskPartWhen(part.when).then(function () {
          that.eventEmitter.emit(_taskPartWhenEvents.TASK_PART_WHEN_EVENTS.START, {
            aliases: [part.alias],
            part: part
          });
          var promise = that.performTask(part);
          promise.then(function () {
            that.eventEmitter.emit(_taskPartWhenEvents.TASK_PART_WHEN_EVENTS.END, {
              aliases: [part.alias],
              part: part
            });
            resolve();
          });
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "handleTaskPartWhen",
    value: function handleTaskPartWhen(whenEntity) {
      var that = this;
      return new Promise(function (resolve, reject) {
        if (null == whenEntity) {
          resolve();
        } else {
          switch (whenEntity.constraintType) {
            case _taskPartConstraint.TASK_CONSTRAINT_TYPES.START:
              that.handleTaskPartWhenPartBegins(whenEntity).then(resolve);
              break;

            case _taskPartConstraint.TASK_CONSTRAINT_TYPES.END:
              that.handleTaskPartWhenPartEnds(whenEntity).then(resolve);
              break;

            case _taskPartConstraint.TASK_CONSTRAINT_TYPES.GROUP:
              that.handleTaskPartWhenPartGroup(whenEntity).then(resolve);
              break;

            case _taskPartConstraint.TASK_CONSTRAINT_TYPES.WAIT_FOR:
              that.handleTaskPartWhenWaitFor(whenEntity).then(resolve);
              break;

            default:
              reject(new Error('Unexpected when entity type.'));
          }
        }
      });
    }
  }, {
    key: "handleTaskPartWhenPartBegins",
    value: function handleTaskPartWhenPartBegins(whenEntity) {
      var that = this;
      return new Promise(function (resolve, reject) {
        var eventHandler = function eventHandler() {
          that.partStartManager.unsubscribe(whenEntity.alias, token);

          if (null == whenEntity.after) {
            resolve();
          } else {
            that.handleTaskPartWhen(whenEntity.after).then(resolve);
          }
        };

        var token = that.partStartManager.subscribe(whenEntity.alias, eventHandler);
      });
    }
  }, {
    key: "handleTaskPartWhenPartEnds",
    value: function handleTaskPartWhenPartEnds(whenEntity) {
      var that = this;
      return new Promise(function (resolve, reject) {
        var eventHandler = function eventHandler() {
          that.partEndManager.unsubscribe(whenEntity.alias, token);

          if (null == whenEntity.after) {
            resolve();
          } else {
            that.handleTaskPartWhen(whenEntity.after).then(resolve);
          }
        };

        var token = that.partEndManager.subscribe(whenEntity.alias, eventHandler);
      });
    }
  }, {
    key: "handleTaskPartWhenPartGroup",
    value: function handleTaskPartWhenPartGroup(whenEntity) {
      var that = this;
      return new Promise(function (resolve, reject) {
        var childPromises = new Array(whenEntity.constraints.length);

        for (var i = 0; i < whenEntity.constraints.length; ++i) {
          childPromises[i] = new Promise(function (resolve, reject) {
            that.handleTaskPartWhen(whenEntity.constraints[i]).then(resolve);
          });
        }

        if (_taskPartWhenOperator.TaskPartWhenOperator.AND === whenEntity.operator) {
          Promise.all(childPromises).then(function () {
            resolve();
          });
        } else if (_taskPartWhenOperator.TaskPartWhenOperator.OR === whenEntity.operator) {
          Promise.race(childPromises).then(function () {
            resolve();
          });
        } else {
          reject('Unexpected operator.');
        }
      });
    }
  }, {
    key: "handleTaskPartWhenWaitFor",
    value: function handleTaskPartWhenWaitFor(whenEntity) {
      var that = this;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (whenEntity.after == null) {
            resolve();
          } else {
            that.handleTaskPartWhen(whenEntity.after).then(resolve);
          }
        }, whenEntity.millis);
      });
    }
  }]);
  return TaskEngine;
}();

exports.TaskEngine = TaskEngine;

},{"./flow/task-part-constraint":5,"./operation/operation-manager":9,"./task-part-when-events":11,"./task-part-when-operator":12,"@babel/runtime/helpers/classCallCheck":14,"@babel/runtime/helpers/createClass":15,"@babel/runtime/helpers/interopRequireDefault":18,"events":22}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TASK_PART_WHEN_EVENTS = void 0;
var TASK_PART_WHEN_EVENTS = {
  END: 'part.end',
  START: 'part.start'
};
exports.TASK_PART_WHEN_EVENTS = TASK_PART_WHEN_EVENTS;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPartWhenOperator = void 0;
var TaskPartWhenOperator;
exports.TaskPartWhenOperator = TaskPartWhenOperator;

(function (TaskPartWhenOperator) {
  TaskPartWhenOperator[TaskPartWhenOperator["AND"] = 0] = "AND";
  TaskPartWhenOperator[TaskPartWhenOperator["OR"] = 1] = "OR";
})(TaskPartWhenOperator || (exports.TaskPartWhenOperator = TaskPartWhenOperator = {}));

},{}],13:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],14:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],15:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],16:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],17:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":20}],18:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],19:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":21,"./assertThisInitialized":13}],20:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],21:[function(require,module,exports){
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[2])(2)
});

//# sourceMappingURL=bundle.dev.js.map

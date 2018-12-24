import { EventEmitter } from 'events';
import { TASK_CONSTRAINT_TYPES } from './flow/task-part-constraint';
import { OperationManager } from './operation/operation-manager';
import { TASK_PART_WHEN_EVENTS } from './task-part-when-events';
import { TaskPartWhenOperator } from './task-part-when-operator';
export class TaskEngine {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.partEndManager = new OperationManager(TASK_PART_WHEN_EVENTS.END, this.eventEmitter);
        this.partStartManager = new OperationManager(TASK_PART_WHEN_EVENTS.START, this.eventEmitter);
    }
    getPartEndListenerAccess() {
        const that = this;
        return {
            subscribe: function (alias, handler) {
                return that.partEndManager.subscribe(alias, handler);
            },
            unsubscribe: function (alias, index) {
                return that.partEndManager.unsubscribe(alias, index);
            },
        };
    }
    getPartStartListenerAccess() {
        const that = this;
        return {
            subscribe: function (alias, handler) {
                return that.partStartManager.subscribe(alias, handler);
            },
            unsubscribe: function (alias, index) {
                return that.partStartManager.unsubscribe(alias, index);
            },
        };
    }
    handle(taskFlow) {
        if (taskFlow == null) {
            throw new Error('It\'s required a task flow.');
        }
        if (taskFlow.parts == null) {
            throw new Error('It\'s required a task flow with parts.');
        }
        this.currentTask = taskFlow;
        const partPromises = new Array(taskFlow.parts.length);
        for (var i = 0; i < taskFlow.parts.length; ++i) {
            partPromises[i] = this.handleTaskPart(taskFlow.parts[i]);
        }
        return partPromises;
    }
    handleTaskPart(part) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.handleTaskPartWhen(part.when).then(function () {
                that.eventEmitter.emit(TASK_PART_WHEN_EVENTS.START, {
                    aliases: [part.alias],
                    part: part,
                });
                const promise = that.performTask(part);
                promise.then(function () {
                    that.eventEmitter.emit(TASK_PART_WHEN_EVENTS.END, {
                        aliases: [part.alias],
                        part: part,
                    });
                    resolve();
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    handleTaskPartWhen(whenEntity) {
        const that = this;
        return new Promise(function (resolve, reject) {
            if (null == whenEntity) {
                resolve();
            }
            else {
                switch (whenEntity.constraintType) {
                    case TASK_CONSTRAINT_TYPES.START:
                        that.handleTaskPartWhenPartBegins(whenEntity)
                            .then(resolve);
                        break;
                    case TASK_CONSTRAINT_TYPES.END:
                        that.handleTaskPartWhenPartEnds(whenEntity)
                            .then(resolve);
                        break;
                    case TASK_CONSTRAINT_TYPES.GROUP:
                        that.handleTaskPartWhenPartGroup(whenEntity)
                            .then(resolve);
                        break;
                    case TASK_CONSTRAINT_TYPES.WAIT_FOR:
                        that.handleTaskPartWhenWaitFor(whenEntity)
                            .then(resolve);
                        break;
                    default:
                        reject(new Error('Unexpected when entity type.'));
                }
            }
        });
    }
    handleTaskPartWhenPartBegins(whenEntity) {
        const that = this;
        return new Promise(function (resolve, reject) {
            const eventHandler = function () {
                that.partStartManager.unsubscribe(whenEntity.alias, token);
                if (null == whenEntity.after) {
                    resolve();
                }
                else {
                    that.handleTaskPartWhen(whenEntity.after)
                        .then(resolve);
                }
            };
            const token = that.partStartManager.subscribe(whenEntity.alias, eventHandler);
        });
    }
    handleTaskPartWhenPartEnds(whenEntity) {
        const that = this;
        return new Promise(function (resolve, reject) {
            const eventHandler = function () {
                that.partEndManager.unsubscribe(whenEntity.alias, token);
                if (null == whenEntity.after) {
                    resolve();
                }
                else {
                    that.handleTaskPartWhen(whenEntity.after)
                        .then(resolve);
                }
            };
            const token = that.partEndManager.subscribe(whenEntity.alias, eventHandler);
        });
    }
    handleTaskPartWhenPartGroup(whenEntity) {
        const that = this;
        return new Promise(function (resolve, reject) {
            const childPromises = new Array(whenEntity.constraints.length);
            for (var i = 0; i < whenEntity.constraints.length; ++i) {
                childPromises[i] = new Promise(function (resolve, reject) {
                    that.handleTaskPartWhen(whenEntity.constraints[i])
                        .then(resolve);
                });
            }
            if (TaskPartWhenOperator.AND === whenEntity.operator) {
                Promise.all(childPromises)
                    .then(function () {
                    resolve();
                });
            }
            else if (TaskPartWhenOperator.OR === whenEntity.operator) {
                Promise.race(childPromises)
                    .then(function () {
                    resolve();
                });
            }
            else {
                reject('Unexpected operator.');
            }
        });
    }
    handleTaskPartWhenWaitFor(whenEntity) {
        const that = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (whenEntity.after == null) {
                    resolve();
                }
                else {
                    that.handleTaskPartWhen(whenEntity.after)
                        .then(resolve);
                }
            }, whenEntity.millis);
        });
    }
}

//# sourceMappingURL=task-engine.js.map

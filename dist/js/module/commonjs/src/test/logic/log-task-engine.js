"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_engine_1 = require("../../task/task-engine");
const sample_log_1 = require("./sample-log");
class LogTaskEngine extends task_engine_1.TaskEngine {
    constructor(log = null) {
        super();
        if (null == log) {
            log = new sample_log_1.SampleLog();
        }
        this.log = log;
    }
    getLog() {
        return this.log;
    }
    performTask(part) {
        const that = this;
        return new Promise((resolve, reject) => {
            const logAction = () => {
                that.log.logMessage(part.message);
                resolve();
            };
            if (null == part.waitForPromise) {
                logAction();
            }
            else {
                part.waitForPromise.then(logAction);
            }
        });
    }
}
exports.LogTaskEngine = LogTaskEngine;

//# sourceMappingURL=log-task-engine.js.map

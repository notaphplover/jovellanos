import { TaskEngine } from '../../task/task-engine';
import { SampleLog } from './sample-log';
export class LogTaskEngine extends TaskEngine {
    constructor(log = null) {
        super();
        if (null == log) {
            log = new SampleLog();
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

//# sourceMappingURL=log-task-engine.js.map

import { TaskEngine } from '../../task/task-engine';
import { LogMessageTaskFlowPart } from './flow/log-message-task-flow-part';
import { SampleLog } from './sample-log';

export class LogTaskEngine extends TaskEngine<LogMessageTaskFlowPart> {

    /**
     * Engine's log used to store messages.
     */
    protected log: SampleLog;

    /**
     * Creates a new engine.
     * @param log Engine's log. If null is passed, the engine will create a new log.
     */
    public constructor(log: SampleLog = null) {
        super();

        if (null == log) {
            log = new SampleLog();
        }

        this.log = log;
    }

    /**
     * Obtains the engine's log.
     */
    public getLog(): SampleLog {
        return this.log;
    }

    /**
     * Performs a task flow part.
     * @param part Task flow part.
     */
    protected performTask(
        part: LogMessageTaskFlowPart,
    ): PromiseLike<{} | void> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.log.logMessage(part.message);
            resolve();
        });
    }
}

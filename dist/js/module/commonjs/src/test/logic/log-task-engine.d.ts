import { TaskEngine } from '../../task/task-engine';
import { LogMessageTaskFlowPart } from './flow/log-message-task-flow-part';
import { SampleLog } from './sample-log';
export declare class LogTaskEngine extends TaskEngine<LogMessageTaskFlowPart> {
    protected log: SampleLog;
    constructor(log?: SampleLog);
    getLog(): SampleLog;
    protected performTask(part: LogMessageTaskFlowPart): PromiseLike<{} | void>;
}

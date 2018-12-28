import { ITaskFlowPart } from '../../../task/flow/task-flow-part';
import { ITaskPartWhenConstraint } from '../../../task/flow/task-flow-when';
export declare class LogMessageTaskFlowPart implements ITaskFlowPart {
    alias: string;
    message: string;
    waitForPromise: PromiseLike<{} | void>;
    when: ITaskPartWhenConstraint;
    constructor(alias: string, message: string, waitForPromise?: PromiseLike<{} | void>, when?: ITaskPartWhenConstraint);
}

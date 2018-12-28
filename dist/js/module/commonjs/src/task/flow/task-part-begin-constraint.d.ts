import { ITaskPartWhenConstraint } from './task-flow-when';
import { TaskPartConstraint } from './task-part-constraint';
export declare class TaskPartBeginConstraint extends TaskPartConstraint {
    constructor(after: ITaskPartWhenConstraint, alias: string);
}

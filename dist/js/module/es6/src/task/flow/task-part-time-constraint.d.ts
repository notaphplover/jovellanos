import { ITaskPartWhenConstraint, TaskPartWhenConstraint } from './task-flow-when';
export declare class TaskTimeConstraint extends TaskPartWhenConstraint {
    millis: number;
    constructor(after: ITaskPartWhenConstraint, millis: number);
}

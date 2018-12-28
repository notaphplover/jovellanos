import { ITaskPartWhenConstraint, TaskPartWhenConstraint } from './task-flow-when';
export declare const TASK_CONSTRAINT_TYPES: {
    END: string;
    GROUP: string;
    START: string;
    WAIT_FOR: string;
};
export declare abstract class TaskPartConstraint extends TaskPartWhenConstraint {
    alias: string;
    constructor(after: ITaskPartWhenConstraint, alias: string, constraintType: string);
}

import { TaskPartWhenOperator } from '../task-part-when-operator';
import { ITaskPartWhenConstraint, TaskPartWhenConstraint } from './task-flow-when';
export declare class TaskGroupConstraint extends TaskPartWhenConstraint {
    constraints: ITaskPartWhenConstraint[];
    operator: TaskPartWhenOperator;
    constructor(after: ITaskPartWhenConstraint, constraints: ITaskPartWhenConstraint[], operator: TaskPartWhenOperator);
}

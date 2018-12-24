import { ITaskPartWhenConstraint } from './task-flow-when';
export interface ITaskFlowPart {
    alias: string;
    when: ITaskPartWhenConstraint;
}

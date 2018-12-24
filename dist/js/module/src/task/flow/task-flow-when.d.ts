export interface ITaskPartWhenConstraint {
    after: ITaskPartWhenConstraint;
    constraintType: string;
}
export declare abstract class TaskPartWhenConstraint implements ITaskPartWhenConstraint {
    after: ITaskPartWhenConstraint;
    constraintType: string;
    constructor(after: ITaskPartWhenConstraint, constraintType: string);
}

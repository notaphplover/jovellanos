import { TaskPartWhenConstraint, } from './task-flow-when';
import { TASK_CONSTRAINT_TYPES } from './task-part-constraint';
export class TaskGroupConstraint extends TaskPartWhenConstraint {
    constructor(after, constraints, operator) {
        super(after, TASK_CONSTRAINT_TYPES.GROUP);
        this.constraints = constraints;
        this.operator = operator;
    }
}

//# sourceMappingURL=task-part-group-constraint.js.map

import { TASK_CONSTRAINT_TYPES, TaskPartConstraint, } from './task-part-constraint';
export class TaskPartEndConstraint extends TaskPartConstraint {
    constructor(after, alias) {
        super(after, alias, TASK_CONSTRAINT_TYPES.END);
    }
}

//# sourceMappingURL=task-part-end-constraint.js.map

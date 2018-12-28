import { TASK_CONSTRAINT_TYPES, TaskPartConstraint, } from './task-part-constraint';
export class TaskPartBeginConstraint extends TaskPartConstraint {
    constructor(after, alias) {
        super(after, alias, TASK_CONSTRAINT_TYPES.START);
    }
}

//# sourceMappingURL=task-part-begin-constraint.js.map

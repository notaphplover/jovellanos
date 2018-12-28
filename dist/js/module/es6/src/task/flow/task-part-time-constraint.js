import { TaskPartWhenConstraint, } from './task-flow-when';
import { TASK_CONSTRAINT_TYPES } from './task-part-constraint';
export class TaskTimeConstraint extends TaskPartWhenConstraint {
    constructor(after, millis) {
        super(after, TASK_CONSTRAINT_TYPES.WAIT_FOR);
        this.millis = millis;
    }
}

//# sourceMappingURL=task-part-time-constraint.js.map

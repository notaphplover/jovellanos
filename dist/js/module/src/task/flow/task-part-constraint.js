import { TaskPartWhenConstraint, } from './task-flow-when';
export const TASK_CONSTRAINT_TYPES = {
    END: 'anim.end',
    GROUP: 'group',
    START: 'anim.start',
    WAIT_FOR: 'wait',
};
export class TaskPartConstraint extends TaskPartWhenConstraint {
    constructor(after, alias, constraintType) {
        super(after, constraintType);
        this.alias = alias;
    }
}

//# sourceMappingURL=task-part-constraint.js.map

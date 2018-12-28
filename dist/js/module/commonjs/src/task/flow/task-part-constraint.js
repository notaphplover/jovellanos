"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_flow_when_1 = require("./task-flow-when");
exports.TASK_CONSTRAINT_TYPES = {
    END: 'anim.end',
    GROUP: 'group',
    START: 'anim.start',
    WAIT_FOR: 'wait',
};
class TaskPartConstraint extends task_flow_when_1.TaskPartWhenConstraint {
    constructor(after, alias, constraintType) {
        super(after, constraintType);
        this.alias = alias;
    }
}
exports.TaskPartConstraint = TaskPartConstraint;

//# sourceMappingURL=task-part-constraint.js.map

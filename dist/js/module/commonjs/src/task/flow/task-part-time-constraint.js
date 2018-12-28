"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_flow_when_1 = require("./task-flow-when");
const task_part_constraint_1 = require("./task-part-constraint");
class TaskTimeConstraint extends task_flow_when_1.TaskPartWhenConstraint {
    constructor(after, millis) {
        super(after, task_part_constraint_1.TASK_CONSTRAINT_TYPES.WAIT_FOR);
        this.millis = millis;
    }
}
exports.TaskTimeConstraint = TaskTimeConstraint;

//# sourceMappingURL=task-part-time-constraint.js.map

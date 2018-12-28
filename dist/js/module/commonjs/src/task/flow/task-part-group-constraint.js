"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_flow_when_1 = require("./task-flow-when");
const task_part_constraint_1 = require("./task-part-constraint");
class TaskGroupConstraint extends task_flow_when_1.TaskPartWhenConstraint {
    constructor(after, constraints, operator) {
        super(after, task_part_constraint_1.TASK_CONSTRAINT_TYPES.GROUP);
        this.constraints = constraints;
        this.operator = operator;
    }
}
exports.TaskGroupConstraint = TaskGroupConstraint;

//# sourceMappingURL=task-part-group-constraint.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_part_constraint_1 = require("./task-part-constraint");
class TaskPartEndConstraint extends task_part_constraint_1.TaskPartConstraint {
    constructor(after, alias) {
        super(after, alias, task_part_constraint_1.TASK_CONSTRAINT_TYPES.END);
    }
}
exports.TaskPartEndConstraint = TaskPartEndConstraint;

//# sourceMappingURL=task-part-end-constraint.js.map

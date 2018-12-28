"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_part_constraint_1 = require("./task-part-constraint");
class TaskPartBeginConstraint extends task_part_constraint_1.TaskPartConstraint {
    constructor(after, alias) {
        super(after, alias, task_part_constraint_1.TASK_CONSTRAINT_TYPES.START);
    }
}
exports.TaskPartBeginConstraint = TaskPartBeginConstraint;

//# sourceMappingURL=task-part-begin-constraint.js.map

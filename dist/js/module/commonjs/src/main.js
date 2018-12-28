"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_part_begin_constraint_1 = require("./task/flow/task-part-begin-constraint");
const task_part_end_constraint_1 = require("./task/flow/task-part-end-constraint");
const task_part_group_constraint_1 = require("./task/flow/task-part-group-constraint");
const task_part_time_constraint_1 = require("./task/flow/task-part-time-constraint");
const operation_manager_1 = require("./task/operation/operation-manager");
const task_engine_1 = require("./task/task-engine");
const task_part_when_events_1 = require("./task/task-part-when-events");
const task_part_when_operator_1 = require("./task/task-part-when-operator");
const jovellanos = {
    task: {
        TASK_PART_WHEN_EVENTS: task_part_when_events_1.TASK_PART_WHEN_EVENTS,
        TaskEngine: task_engine_1.TaskEngine,
        TaskPartWhenOperator: task_part_when_operator_1.TaskPartWhenOperator,
        flow: {
            TaskGroupConstraint: task_part_group_constraint_1.TaskGroupConstraint,
            TaskPartBeginConstraint: task_part_begin_constraint_1.TaskPartBeginConstraint,
            TaskPartEndConstraint: task_part_end_constraint_1.TaskPartEndConstraint,
            TaskTimeConstraint: task_part_time_constraint_1.TaskTimeConstraint,
        },
        operation: {
            OperationManager: operation_manager_1.OperationManager,
        },
    },
};
module.exports = jovellanos;

//# sourceMappingURL=main.js.map

import { TaskPartBeginConstraint } from './task/flow/task-part-begin-constraint';
import { TaskPartEndConstraint } from './task/flow/task-part-end-constraint';
import { TaskGroupConstraint } from './task/flow/task-part-group-constraint';
import { TaskTimeConstraint } from './task/flow/task-part-time-constraint';
import { OperationManager } from './task/operation/operation-manager';
import { TaskEngine } from './task/task-engine';
import { TASK_PART_WHEN_EVENTS } from './task/task-part-when-events';
import { TaskPartWhenOperator } from './task/task-part-when-operator';
const jovellanos = {
    task: {
        TASK_PART_WHEN_EVENTS: TASK_PART_WHEN_EVENTS,
        TaskEngine: TaskEngine,
        TaskPartWhenOperator: TaskPartWhenOperator,
        flow: {
            TaskGroupConstraint: TaskGroupConstraint,
            TaskPartBeginConstraint: TaskPartBeginConstraint,
            TaskPartEndConstraint: TaskPartEndConstraint,
            TaskTimeConstraint: TaskTimeConstraint,
        },
        operation: {
            OperationManager: OperationManager,
        },
    },
};
module.exports = jovellanos;

//# sourceMappingURL=main.js.map

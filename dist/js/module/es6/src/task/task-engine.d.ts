/// <reference types="node" />
import { EventEmitter } from 'events';
import { ITaskFlow } from './flow/task-flow';
import { ITaskFlowPart } from './flow/task-flow-part';
import { ITaskFlowPartEndArgs, ITaskFlowPartStartArgs } from './flow/task-flow-part-event-args';
import { ITaskPartWhenConstraint } from './flow/task-flow-when';
import { TaskPartBeginConstraint } from './flow/task-part-begin-constraint';
import { TaskPartEndConstraint } from './flow/task-part-end-constraint';
import { TaskGroupConstraint } from './flow/task-part-group-constraint';
import { TaskTimeConstraint } from './flow/task-part-time-constraint';
import { OperationManager } from './operation/operation-manager';
import { IOperationManagerAccess } from './operation/operation-manager-access';
export declare abstract class TaskEngine<TPart extends ITaskFlowPart> {
    protected currentTask: ITaskFlow<TPart>;
    protected eventEmitter: EventEmitter;
    protected partEndManager: OperationManager<ITaskFlowPartEndArgs<TPart>>;
    protected partStartManager: OperationManager<ITaskFlowPartStartArgs<TPart>>;
    constructor();
    getPartEndListenerAccess(): IOperationManagerAccess<ITaskFlowPartEndArgs<TPart>>;
    getPartStartListenerAccess(): IOperationManagerAccess<ITaskFlowPartStartArgs<TPart>>;
    handle(taskFlow: ITaskFlow<TPart>): Array<Promise<void>>;
    protected handleTaskPart(part: TPart): Promise<void>;
    protected abstract performTask(part: TPart): PromiseLike<{} | void>;
    protected handleTaskPartWhen(whenEntity: ITaskPartWhenConstraint): Promise<void>;
    protected handleTaskPartWhenPartBegins(whenEntity: TaskPartBeginConstraint): Promise<void>;
    protected handleTaskPartWhenPartEnds(whenEntity: TaskPartEndConstraint): Promise<void>;
    protected handleTaskPartWhenPartGroup(whenEntity: TaskGroupConstraint): Promise<void>;
    protected handleTaskPartWhenWaitFor(whenEntity: TaskTimeConstraint): Promise<void>;
}

import { ITaskFlowPart } from './task-flow-part';
export interface ITaskFlow<TPart extends ITaskFlowPart> {
    parts: TPart[];
}

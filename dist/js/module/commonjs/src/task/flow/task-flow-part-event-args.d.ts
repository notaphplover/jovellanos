import { IOperationArgs } from '../operation/operation-manager';
import { ITaskFlowPart } from './task-flow-part';
export interface ITaskFlowPartArgs<TPart extends ITaskFlowPart> extends IOperationArgs {
    part: TPart;
}
export interface ITaskFlowPartEndArgs<TPart extends ITaskFlowPart> extends ITaskFlowPartArgs<TPart> {
}
export interface ITaskFlowPartStartArgs<TPart extends ITaskFlowPart> extends ITaskFlowPartArgs<TPart> {
}

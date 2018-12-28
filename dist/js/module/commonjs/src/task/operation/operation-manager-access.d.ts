import { IOperationArgs } from './operation-manager';
export interface IOperationManagerAccess<Args extends IOperationArgs> {
    subscribe(alias: string, handler: (eventArgs: Args) => void): number;
    unsubscribe(alias: string, index: number): boolean;
}

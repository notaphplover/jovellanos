/// <reference types="node" />
import { EventEmitter } from 'events';
import { TokenMap } from '../../collection/token-map';
import { IOperationManagerAccess } from './operation-manager-access';
export interface IOperationArgs {
    aliases: string[];
}
export declare class OperationManager<Args extends IOperationArgs> implements IOperationManagerAccess<Args> {
    protected callFunction: (eventArgs: Args) => void;
    protected eventAlias: string;
    protected eventEmitter: EventEmitter;
    protected subscriptionStorage: {
        [alias: string]: TokenMap<(eventArgs: Args) => void>;
    };
    constructor(eventAlias: string, eventEmitter: EventEmitter);
    dispose(): void;
    subscribe(alias: string, handler: (eventArgs: Args) => void): number;
    unsubscribe(alias: string, index: number): boolean;
}

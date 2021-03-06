import { EventEmitter } from 'events';
import { ITaskFlowPartEndArgs } from '../../../task/flow/task-flow-part-event-args';
import { OperationManager } from '../../../task/operation/operation-manager';
import { ITest } from '../../ITest';
import { LogMessageTaskFlowPart } from '../../logic/flow/log-message-task-flow-part';
import { SampleLog } from '../../logic/sample-log';

const operationManagerTestEventAlias = 'test-alias';

export class OperationManagerTests implements ITest {
    public performTests(): void {
        describe('Operation Manager Tests', () => {
            this.itMustBeToBeAbleToBeDisposed();
            this.itMustBeInitializable();
            this.itMustBeAbleToRaiseAnEventListeners();
            this.itMustBeAbleToRaiseMultipleEventListeners();
            this.itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias();
        });
    }

    private itMustBeToBeAbleToBeDisposed(): void {
        it('mustBeToBeAbleToBeDisposed', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            const log = new SampleLog();
            operationManager.subscribe(
                'sample-alias',
                (eventArgs) => log.logMessage(eventArgs.part.message),
            );
            operationManager.dispose();
            eventEmitter.emit(
                operationManagerTestEventAlias,
                {
                    aliases: ['sample-alias'],
                    part: new LogMessageTaskFlowPart(
                        'sample-task-alias',
                        'sample-message-text',
                    ),
                } as ITaskFlowPartEndArgs<LogMessageTaskFlowPart>,
            );
            expect(log.getMessages()).toEqual([]);
        });
    }

    private itMustBeAbleToRaiseAnEventListeners(): void {
        it('mustBeAbleToRaiseAnEventListeners', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            const log = new SampleLog();
            operationManager.subscribe(
                'sample-alias',
                (eventArgs) => log.logMessage(eventArgs.part.message),
            );
            eventEmitter.emit(
                operationManagerTestEventAlias,
                {
                    aliases: ['sample-alias'],
                    part: new LogMessageTaskFlowPart(
                        'sample-task-alias',
                        'sample-message-text',
                    ),
                } as ITaskFlowPartEndArgs<LogMessageTaskFlowPart>,
            );
            expect(log.getMessages()).toEqual(['sample-message-text']);
        });
    }

    private itMustBeAbleToRaiseMultipleEventListeners(): void {
        it('mustBeAbleToRaiseMultipleEventListeners', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            const log = new SampleLog();
            operationManager.subscribe(
                'sample-alias',
                (eventArgs) => log.logMessage(eventArgs.part.message),
            );
            operationManager.subscribe(
                'sample-alias-2',
                (eventArgs) => log.logMessage(eventArgs.part.message),
            );
            eventEmitter.emit(
                operationManagerTestEventAlias,
                {
                    aliases: null,
                    part: new LogMessageTaskFlowPart(
                        'sample-task-alias',
                        'sample-message-text',
                    ),
                } as ITaskFlowPartEndArgs<LogMessageTaskFlowPart>,
            );
            expect(log.getMessages()).toEqual(['sample-message-text', 'sample-message-text']);
        });
    }

    private itMustBeInitializable(): void {
        it('mustBeInitializable', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            expect(operationManager).not.toBeNull();
        });
    }

    private itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias() {
        it('mustNotBeAbleToUnsuscribeByAnUnregisteredAlias', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            expect(operationManager.unsubscribe('unexisting-alias', 0)).toBe(false);
        });
    }
}

import { EventEmitter } from 'events';
import { OperationManager } from '../../../task/operation/operation-manager';
import { LogMessageTaskFlowPart } from '../../logic/flow/log-message-task-flow-part';
import { SampleLog } from '../../logic/sample-log';
const operationManagerTestEventAlias = 'test-alias';
export class OperationManagerTests {
    performTests() {
        describe('Operation Manager Tests', () => {
            this.itMustBeToBeAbleToBeDisposed();
            this.itMustBeInitializable();
            this.itMustBeAbleToRaiseAnEventListeners();
            this.itMustBeAbleToRaiseMultipleEventListeners();
            this.itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias();
        });
    }
    itMustBeToBeAbleToBeDisposed() {
        it('mustBeToBeAbleToBeDisposed', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            operationManager.dispose();
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: ['sample-alias'],
                part: new LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual([]);
        });
    }
    itMustBeAbleToRaiseAnEventListeners() {
        it('mustBeAbleToRaiseAnEventListeners', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: ['sample-alias'],
                part: new LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual(['sample-message-text']);
        });
    }
    itMustBeAbleToRaiseMultipleEventListeners() {
        it('mustBeAbleToRaiseMultipleEventListeners', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            operationManager.subscribe('sample-alias-2', (eventArgs) => log.logMessage(eventArgs.part.message));
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: null,
                part: new LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual(['sample-message-text', 'sample-message-text']);
        });
    }
    itMustBeInitializable() {
        it('mustBeInitializable', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager(operationManagerTestEventAlias, eventEmitter);
            expect(operationManager).not.toBeNull();
        });
    }
    itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias() {
        it('mustNotBeAbleToUnsuscribeByAnUnregisteredAlias', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager(operationManagerTestEventAlias, eventEmitter);
            expect(operationManager.unsubscribe('unexisting-alias', 0)).toBe(false);
        });
    }
}

//# sourceMappingURL=operation-manager.test.js.map

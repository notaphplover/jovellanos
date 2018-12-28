"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const operation_manager_1 = require("../../../task/operation/operation-manager");
const log_message_task_flow_part_1 = require("../../logic/flow/log-message-task-flow-part");
const sample_log_1 = require("../../logic/sample-log");
const operationManagerTestEventAlias = 'test-alias';
class OperationManagerTests {
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
            const eventEmitter = new events_1.EventEmitter();
            const operationManager = new operation_manager_1.OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new sample_log_1.SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            operationManager.dispose();
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: ['sample-alias'],
                part: new log_message_task_flow_part_1.LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual([]);
        });
    }
    itMustBeAbleToRaiseAnEventListeners() {
        it('mustBeAbleToRaiseAnEventListeners', () => {
            const eventEmitter = new events_1.EventEmitter();
            const operationManager = new operation_manager_1.OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new sample_log_1.SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: ['sample-alias'],
                part: new log_message_task_flow_part_1.LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual(['sample-message-text']);
        });
    }
    itMustBeAbleToRaiseMultipleEventListeners() {
        it('mustBeAbleToRaiseMultipleEventListeners', () => {
            const eventEmitter = new events_1.EventEmitter();
            const operationManager = new operation_manager_1.OperationManager(operationManagerTestEventAlias, eventEmitter);
            const log = new sample_log_1.SampleLog();
            operationManager.subscribe('sample-alias', (eventArgs) => log.logMessage(eventArgs.part.message));
            operationManager.subscribe('sample-alias-2', (eventArgs) => log.logMessage(eventArgs.part.message));
            eventEmitter.emit(operationManagerTestEventAlias, {
                aliases: null,
                part: new log_message_task_flow_part_1.LogMessageTaskFlowPart('sample-task-alias', 'sample-message-text'),
            });
            expect(log.getMessages()).toEqual(['sample-message-text', 'sample-message-text']);
        });
    }
    itMustBeInitializable() {
        it('mustBeInitializable', () => {
            const eventEmitter = new events_1.EventEmitter();
            const operationManager = new operation_manager_1.OperationManager(operationManagerTestEventAlias, eventEmitter);
            expect(operationManager).not.toBeNull();
        });
    }
    itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias() {
        it('mustNotBeAbleToUnsuscribeByAnUnregisteredAlias', () => {
            const eventEmitter = new events_1.EventEmitter();
            const operationManager = new operation_manager_1.OperationManager(operationManagerTestEventAlias, eventEmitter);
            expect(operationManager.unsubscribe('unexisting-alias', 0)).toBe(false);
        });
    }
}
exports.OperationManagerTests = OperationManagerTests;

//# sourceMappingURL=operation-manager.test.js.map

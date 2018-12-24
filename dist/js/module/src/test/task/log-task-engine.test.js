import { TaskPartBeginConstraint } from '../../task/flow/task-part-begin-constraint';
import { TaskPartEndConstraint } from '../../task/flow/task-part-end-constraint';
import { TaskGroupConstraint } from '../../task/flow/task-part-group-constraint';
import { TaskTimeConstraint } from '../../task/flow/task-part-time-constraint';
import { TaskPartWhenOperator } from '../../task/task-part-when-operator';
import { LogMessageTaskFlowPart, } from '../logic/flow/log-message-task-flow-part';
import { LogTaskEngine } from '../logic/log-task-engine';
import { SampleLog } from '../logic/sample-log';
const LogMessageTaskFlowPartAliasPrefix = 'jovellanos/test/LogMessageTaskFlowPart/';
export class LogTaskEngineTests {
    performTests() {
        describe('Log Task Engine Tests', () => {
            this.itMustBeAbleToPerformASimpleTask();
            this.itMustBeAbleToPerformATaskAfterACertainAmountOfTime();
            this.itMustBeAbleToPerformATaskAfterTheEndOfAllTasksOfATaskGroup();
            this.itMustBeAbleToPerformATaskAfterTheEndOfAnotherOne();
            this.itMustBeAbleToPerformATaskAfterTheStartOfAnotherOne();
            this.itMustBeAbleToPerformATaskAfterTheStartOfAnyTaskOfATaskGroup();
            this.itMustBeAbleToSubscribeAPartEndEventListener();
            this.itMustBeAbleToSubscribeAPartStartEventListener();
            this.itMustBeAbleToUnsubscribeAPartEndEventListener();
            this.itMustBeAbleToUnsubscribeAPartStartEventListener();
            this.itMustBeInitializable();
            this.itMustNotAllowToHandleANullInstance();
            this.itMustNotAllowToHandleAnInstanceWithNoParts();
            this.itMustNotBeAbleToHandleAnInvalidTask();
            this.itMustStartWithALog();
            this.itMustStartWithNoMessages();
        });
    }
    itMustBeAbleToPerformASimpleTask() {
        it('mustBeAbleToPerformASimpleTask', () => {
            const engine = new LogTaskEngine();
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(LogMessageTaskFlowPartAliasPrefix + 'sample', 'test'),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test']);
            });
        });
    }
    itMustBeAbleToPerformATaskAfterACertainAmountOfTime() {
        it('mustBeAbleToPerformATaskAfterACertainAmountOfTime', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const partAlias3 = LogMessageTaskFlowPartAliasPrefix + 'sample-3';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const taskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias1, 'test-1', new Promise((resolve) => setTimeout(resolve, 200))),
                    new LogMessageTaskFlowPart(partAlias2, 'test-2', null, new TaskTimeConstraint(null, 250)),
                    new LogMessageTaskFlowPart(partAlias3, 'test-3', new Promise((resolve) => setTimeout(resolve, 300))),
                ],
            };
            Promise.all(engine.handle(taskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test-1', 'test-2', 'test-3']);
            });
        });
    }
    itMustBeAbleToPerformATaskAfterTheEndOfAllTasksOfATaskGroup() {
        it('mustBeAbleToPerformATaskAfterTheEndOfAllTasksOfATaskGroup', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const partAlias3 = LogMessageTaskFlowPartAliasPrefix + 'sample-3';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const taskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias1, 'test-1', null, new TaskGroupConstraint(null, [
                        new TaskPartEndConstraint(null, partAlias2),
                        new TaskPartEndConstraint(null, partAlias3),
                    ], TaskPartWhenOperator.AND)),
                    new LogMessageTaskFlowPart(partAlias2, 'test-2', null),
                    new LogMessageTaskFlowPart(partAlias3, 'test-3', null),
                ],
            };
            Promise.all(engine.handle(taskFlow)).then(() => {
                const logMessages = engine.getLog().getMessages();
                const firstOnes = ['test-2', 'test-3'];
                expect(firstOnes).toContain(logMessages[0]);
                expect(firstOnes).toContain(logMessages[1]);
                expect(logMessages[0]).not.toBe(logMessages[1]);
                expect(logMessages[2]).toBe('test-1');
            });
        });
    }
    itMustBeAbleToPerformATaskAfterTheEndOfAnotherOne() {
        it('mustBeAbleToPerformATaskAfterTheEndOfAnotherOne', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const taskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias1, 'test1', null, new TaskPartEndConstraint(null, partAlias2)),
                    new LogMessageTaskFlowPart(partAlias2, 'test2'),
                ],
            };
            Promise.all(engine.handle(taskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test2', 'test1']);
            });
        });
    }
    itMustBeAbleToPerformATaskAfterTheStartOfAnotherOne() {
        it('mustBeAbleToPerformATaskAfterTheStartOfAnotherOne', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const part1SubscriberIsRegistered = new Promise((resolve) => {
                const part1IsDone = new Promise((resolveCh) => {
                    const token = engine.getPartEndListenerAccess().subscribe(partAlias1, () => {
                        resolveCh(token);
                    });
                });
                resolve({
                    donePromise: part1IsDone,
                });
            });
            part1SubscriberIsRegistered.then((promiseResult) => {
                const taskFlow = {
                    parts: [
                        new LogMessageTaskFlowPart(partAlias1, 'test1', null, new TaskPartBeginConstraint(null, partAlias2)),
                        new LogMessageTaskFlowPart(partAlias2, 'test2', promiseResult.donePromise),
                    ],
                };
                Promise.all(engine.handle(taskFlow)).then(() => {
                    expect(engine.getLog().getMessages()).toEqual(['test1', 'test2']);
                });
            });
        });
    }
    itMustBeAbleToPerformATaskAfterTheStartOfAnyTaskOfATaskGroup() {
        it('mustBeAbleToPerformATaskAfterTheStartOfAnyTaskOfATaskGroup', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const partAlias3 = LogMessageTaskFlowPartAliasPrefix + 'sample-3';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const part1SubscriberIsRegistered = new Promise((resolve) => {
                const part1IsDone = new Promise((resolveCh) => {
                    const token = engine.getPartEndListenerAccess().subscribe(partAlias1, () => {
                        resolveCh(token);
                    });
                });
                resolve({
                    donePromise: part1IsDone,
                });
            });
            part1SubscriberIsRegistered.then((promiseResult) => {
                const taskFlow = {
                    parts: [
                        new LogMessageTaskFlowPart(partAlias1, 'test-1', null, new TaskGroupConstraint(null, [
                            new TaskPartBeginConstraint(null, partAlias2),
                            new TaskPartBeginConstraint(null, partAlias3),
                        ], TaskPartWhenOperator.OR)),
                        new LogMessageTaskFlowPart(partAlias2, 'test-2', promiseResult.donePromise),
                        new LogMessageTaskFlowPart(partAlias3, 'test-3', promiseResult.donePromise),
                    ],
                };
                Promise.all(engine.handle(taskFlow)).then(() => {
                    const logMessages = engine.getLog().getMessages();
                    const lastOnes = ['test-2', 'test-3'];
                    expect(lastOnes).toContain(logMessages[1]);
                    expect(lastOnes).toContain(logMessages[2]);
                    expect(logMessages[1]).not.toBe(logMessages[2]);
                    expect(logMessages[0]).toBe('test-1');
                });
            });
        });
    }
    itMustBeAbleToSubscribeAPartEndEventListener() {
        it('mustBeAbleToSubscribeAPartEndEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            engine.getPartEndListenerAccess().subscribe(partAlias, (eventArgs) => {
                log.logMessage('end.' + eventArgs.part.message);
            });
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias, 'test'),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual([
                    'test',
                    'end.test',
                ]);
            });
        });
    }
    itMustBeAbleToSubscribeAPartStartEventListener() {
        it('mustBeAbleToSubscribeAPartStartEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            engine.getPartStartListenerAccess().subscribe(partAlias, (eventArgs) => {
                log.logMessage('start.' + eventArgs.part.message);
            });
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias, 'test'),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual([
                    'start.test',
                    'test',
                ]);
            });
        });
    }
    itMustBeAbleToUnsubscribeAPartEndEventListener() {
        it('mustBeAbleToUnsubscribeAPartEndEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const token = engine.getPartEndListenerAccess().subscribe(partAlias, (eventArgs) => {
                log.logMessage('end.' + eventArgs.part.message);
            });
            const result = engine.getPartEndListenerAccess().unsubscribe(partAlias, token);
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias, 'test'),
                ],
            };
            expect(result).toBe(true);
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual([
                    'test',
                ]);
            });
        });
    }
    itMustBeAbleToUnsubscribeAPartStartEventListener() {
        it('mustBeAbleToUnsubscribeAPartStartEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const token = engine.getPartStartListenerAccess().subscribe(partAlias, (eventArgs) => {
                log.logMessage('end.' + eventArgs.part.message);
            });
            const result = engine.getPartStartListenerAccess().unsubscribe(partAlias, token);
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(partAlias, 'test'),
                ],
            };
            expect(result).toBe(true);
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual([
                    'test',
                ]);
            });
        });
    }
    itMustBeInitializable() {
        it('mustBeInitializable', () => {
            const engine = new LogTaskEngine();
            expect(engine).not.toBeNull();
        });
    }
    itMustNotAllowToHandleANullInstance() {
        it('mustNotAllowToHandleANullInstance', () => {
            const engine = new LogTaskEngine();
            expect(() => { engine.handle(null); }).toThrowError();
        });
    }
    itMustNotAllowToHandleAnInstanceWithNoParts() {
        it('mustNotAllowToHandleAnInstanceWithNoParts', () => {
            const engine = new LogTaskEngine();
            expect(() => {
                engine.handle({});
            }).toThrowError();
            expect(() => {
                engine.handle({
                    parts: null,
                });
            }).toThrowError();
        });
    }
    itMustNotBeAbleToHandleAnInvalidTask() {
        it('mustNotBeAbleToHandleAnInvalidTask', () => {
            const engine = new LogTaskEngine();
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(LogMessageTaskFlowPartAliasPrefix + 'sample', 'test', null, {
                        after: null,
                        constraintType: 'invalidType',
                    }),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow))
                .then(fail)
                .catch((err) => expect(err instanceof Error).toBe(true));
        });
    }
    itMustStartWithALog() {
        it('mustStartWithALog', () => {
            const engine = new LogTaskEngine();
            expect(engine.getLog()).not.toBeNull();
        });
    }
    itMustStartWithNoMessages() {
        it('mustStartWithNoMessages', () => {
            const engine = new LogTaskEngine();
            expect(engine.getLog().getMessages().length).toBe(0);
        });
    }
}

//# sourceMappingURL=log-task-engine.test.js.map

import { ITaskFlow } from '../../task/flow/task-flow';
import { TaskPartBeginConstraint } from '../../task/flow/task-part-begin-constraint';
import { TaskPartEndConstraint } from '../../task/flow/task-part-end-constraint';
import { ITest } from '../ITest';
import {
    LogMessageTaskFlowPart,
} from '../logic/flow/log-message-task-flow-part';
import { LogTaskEngine } from '../logic/log-task-engine';
import { SampleLog } from '../logic/sample-log';

const LogMessageTaskFlowPartAliasPrefix: string = 'jovellanos/test/LogMessageTaskFlowPart/';

export class LogTaskEngineTests implements ITest {

    public performTests(): void {
        describe('Log Task Engine Tests', () => {
            this.itMustBeAbleToPerformASimpleTask();
            this.itMustBeAbleToPerformATaskAfterTheEndOfAnotherOne();
            this.itMustBeAbleToPerformATaskAfterTheStartOfAnotherOne();
            this.itMustBeAbleToSubscribeAPartEndEventListener();
            this.itMustBeAbleToSubscribeAPartStartEventListener();
            this.itMustBeAbleToUnsubscribeAPartEndEventListener();
            this.itMustBeAbleToUnsubscribeAPartStartEventListener();
            this.itMustBeInitializable();
            this.itMustNotAllowToHandleANullInstance();
            this.itMustNotAllowToHandleAnInstanceWithNoParts();
            this.itMustStartWithALog();
            this.itMustStartWithNoMessages();
        });
    }

    private itMustBeAbleToPerformASimpleTask(): void {
        it('mustBeAbleToPerformASimpleTask', () => {
            const engine = new LogTaskEngine();
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(
                        LogMessageTaskFlowPartAliasPrefix + 'sample',
                        'test',
                    ),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test']);
            });
        });
    }

    private itMustBeAbleToPerformATaskAfterTheEndOfAnotherOne(): void {
        it('mustBeAbleToPerformATaskAfterTheEndOfAnotherOne', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const taskFlow = {
                parts: [
                    new LogMessageTaskFlowPart(
                        partAlias1,
                        'test1',
                        null,
                        new TaskPartEndConstraint(null, partAlias2),
                    ),
                    new LogMessageTaskFlowPart(partAlias2, 'test2'),
                ],
            };
            Promise.all(engine.handle(taskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test2', 'test1']);
            });
        });
    }

    private itMustBeAbleToPerformATaskAfterTheStartOfAnotherOne(): void {
        it('mustBeAbleToPerformATaskAfterTheStartOfAnotherOne', () => {
            const partAlias1 = LogMessageTaskFlowPartAliasPrefix + 'sample-1';
            const partAlias2 = LogMessageTaskFlowPartAliasPrefix + 'sample-2';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);

            const part1SubscriberIsRegistered = new Promise<{
                donePromise: Promise<number>,
            }>(
                (resolve) => {
                    const part1IsDone = new Promise<number>((resolveCh) => {
                        const token = engine.getPartEndListenerAccess().subscribe(partAlias1, () => {
                            resolveCh(token);
                        });
                    });
                    resolve({
                        donePromise: part1IsDone,
                    });
                },
            );
            part1SubscriberIsRegistered.then((promiseResult) => {
                const taskFlow = {
                    parts: [
                        new LogMessageTaskFlowPart(
                            partAlias1,
                            'test1',
                            null,
                            new TaskPartBeginConstraint(null, partAlias2),
                        ),
                        new LogMessageTaskFlowPart(
                            partAlias2,
                            'test2',
                            promiseResult.donePromise,
                        ),
                    ],
                };
                Promise.all(engine.handle(taskFlow)).then(() => {
                    expect(engine.getLog().getMessages()).toEqual(['test1', 'test2']);
                });
            });
        });
    }

    private itMustBeAbleToSubscribeAPartEndEventListener(): void {
        it('mustBeAbleToSubscribeAPartEndEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            engine.getPartEndListenerAccess().subscribe(
                partAlias,
                (eventArgs) => {
                    log.logMessage('end.' + eventArgs.part.message);
                },
            );
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

    private itMustBeAbleToSubscribeAPartStartEventListener(): void {
        it('mustBeAbleToSubscribeAPartStartEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            engine.getPartStartListenerAccess().subscribe(
                partAlias,
                (eventArgs) => {
                    log.logMessage('start.' + eventArgs.part.message);
                },
            );
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

    private itMustBeAbleToUnsubscribeAPartEndEventListener(): void {
        it('mustBeAbleToUnsubscribeAPartEndEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const token = engine.getPartEndListenerAccess().subscribe(
                partAlias,
                (eventArgs) => {
                    log.logMessage('end.' + eventArgs.part.message);
                },
            );
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

    private itMustBeAbleToUnsubscribeAPartStartEventListener(): void {
        it('mustBeAbleToUnsubscribeAPartStartEventListener', () => {
            const partAlias = LogMessageTaskFlowPartAliasPrefix + 'sample';
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            const token = engine.getPartStartListenerAccess().subscribe(
                partAlias,
                (eventArgs) => {
                    log.logMessage('end.' + eventArgs.part.message);
                },
            );
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

    private itMustBeInitializable(): void {
        it('mustBeInitializable', () => {
            const engine = new LogTaskEngine();
            expect(engine).not.toBeNull();
        });
    }

    private itMustNotAllowToHandleANullInstance(): void {
        it('mustNotAllowToHandleANullInstance', () => {
            const engine = new LogTaskEngine();
            expect(() => {engine.handle(null); }).toThrowError();
        });
    }

    private itMustNotAllowToHandleAnInstanceWithNoParts(): void {
        it('mustNotAllowToHandleAnInstanceWithNoParts', () => {
            const engine = new LogTaskEngine();
            expect(() => {
                engine.handle({} as ITaskFlow<LogMessageTaskFlowPart>);
            }).toThrowError();
            expect(() => {
                engine.handle({
                    parts: null,
                });
            }).toThrowError();
        });
    }

    private itMustStartWithALog(): void {
        it('mustStartWithALog', () => {
            const engine = new LogTaskEngine();
            expect(engine.getLog()).not.toBeNull();
        });
    }

    private itMustStartWithNoMessages(): void {
        it('mustStartWithNoMessages', () => {
            const engine = new LogTaskEngine();
            expect(engine.getLog().getMessages().length).toBe(0);
        });
    }
}

import { ITaskFlow } from '../../task/flow/task-flow';
import { TASK_PART_WHEN_EVENTS } from '../../task/task-part-when-events';
import { ITest } from '../ITest';
import { LogMessageTaskFlowPart } from '../logic/flow/log-message-task-flow-part';
import { LogTaskEngine } from '../logic/log-task-engine';
import { SampleLog } from '../logic/sample-log';

export class LogTaskEngineTests implements ITest {

    public performTests(): void {
        describe('Log Task Engine Tests', () => {
            this.itMustBeAbleToPerformASimpleTask();
            this.itMustBeAbleToSubscribeAPartStartEventListener();
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
                    new LogMessageTaskFlowPart('test'),
                ],
            };
            Promise.all(engine.handle(simpleTaskFlow)).then(() => {
                expect(engine.getLog().getMessages()).toEqual(['test']);
            });
        });
    }

    private itMustBeAbleToSubscribeAPartStartEventListener(): void {
        it('mustBeAbleToSubscribeAPartStartEventListener', () => {
            const log = new SampleLog();
            const engine = new LogTaskEngine(log);
            engine.getPartStartListenerAccess().subscribe(
                TASK_PART_WHEN_EVENTS.START,
                (eventArgs) => {
                    log.logMessage('start.' + eventArgs.part.message);
                },
            );
            const simpleTaskFlow = {
                parts: [
                    new LogMessageTaskFlowPart('test'),
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

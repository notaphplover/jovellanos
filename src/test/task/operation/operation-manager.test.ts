import { EventEmitter } from 'events';
import { ITaskFlowPartEndArgs } from '../../../task/flow/task-flow-part-event-args';
import { OperationManager } from '../../../task/operation/operation-manager';
import { ITest } from '../../ITest';
import { LogMessageTaskFlowPart } from '../../logic/flow/log-message-task-flow-part';

const operationManagerTestEventAlias = 'test-alias';

export class OperationManagerTests implements ITest {
    public performTests(): void {
        describe('Operation Manager Tests', () => {
            this.itMustBeInitializable();
        });
    }

    private itMustBeInitializable() {
        it('mustBeInitializable', () => {
            const eventEmitter = new EventEmitter();
            const operationManager = new OperationManager<ITaskFlowPartEndArgs<LogMessageTaskFlowPart>>(
                operationManagerTestEventAlias,
                eventEmitter,
            );
            expect(operationManager).not.toBeNull();
        });
    }
}

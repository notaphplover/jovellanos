import { ITaskFlowPart } from '../../../task/flow/task-flow-part';
import { ITaskPartWhenConstraint } from '../../../task/flow/task-flow-when';

export const LogMessageTaskFlowPartAlias: string = 'jovellanos/test/LogMessageTaskFlowPart';

export class LogMessageTaskFlowPart implements ITaskFlowPart {
    /**
     * Alias of the part
     */
    public alias: string;
    /**
     * Message to log.
     */
    public message: string;
    /**
     * Constraints to ensure before applying the styles.
     */
    public when: ITaskPartWhenConstraint;

    /**
     * Creates a new instance of this class.
     *
     * @param message message to log.
     * @param when When constraint of the task.
     */
    public constructor(
        message: string,
        when: ITaskPartWhenConstraint = null,
    ) {
        this.alias = LogMessageTaskFlowPartAlias;
        this.message = message;
        this.when = when;
    }
}

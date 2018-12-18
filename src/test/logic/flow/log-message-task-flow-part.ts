import { ITaskFlowPart } from '../../../task/flow/task-flow-part';
import { ITaskPartWhenConstraint } from '../../../task/flow/task-flow-when';

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
     * The message won't be log until the promise is fullfilled.
     */
    public waitForPromise: PromiseLike<{} | void>;
    /**
     * Constraints to ensure before applying the styles.
     */
    public when: ITaskPartWhenConstraint;

    /**
     * Creates a new instance of this class.
     *
     * @param alias alias of the part.
     * @param message message to log.
     * @param waitForPromise Promise that must be fullfilled before loging the message.
     * @param when When constraint of the task.
     */
    public constructor(
        alias: string,
        message: string,
        waitForPromise: PromiseLike<{} | void> = null,
        when: ITaskPartWhenConstraint = null,
    ) {
        this.alias = alias;
        this.message = message;
        this.waitForPromise = waitForPromise;
        this.when = when;
    }
}

import { ITest } from '../ITest';
export declare class LogTaskEngineTests implements ITest {
    performTests(): void;
    private itMustBeAbleToPerformASimpleTask;
    private itMustBeAbleToPerformATaskAfterACertainAmountOfTime;
    private itMustBeAbleToPerformATaskAfterTheEndOfAllTasksOfATaskGroup;
    private itMustBeAbleToPerformATaskAfterTheEndOfAnotherOne;
    private itMustBeAbleToPerformATaskAfterTheStartOfAnotherOne;
    private itMustBeAbleToPerformATaskAfterTheStartOfAnyTaskOfATaskGroup;
    private itMustBeAbleToSubscribeAPartEndEventListener;
    private itMustBeAbleToSubscribeAPartStartEventListener;
    private itMustBeAbleToUnsubscribeAPartEndEventListener;
    private itMustBeAbleToUnsubscribeAPartStartEventListener;
    private itMustBeInitializable;
    private itMustNotAllowToHandleANullInstance;
    private itMustNotAllowToHandleAnInstanceWithNoParts;
    private itMustNotBeAbleToHandleAnInvalidTask;
    private itMustStartWithALog;
    private itMustStartWithNoMessages;
}

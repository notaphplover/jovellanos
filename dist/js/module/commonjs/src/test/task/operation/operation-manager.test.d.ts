import { ITest } from '../../ITest';
export declare class OperationManagerTests implements ITest {
    performTests(): void;
    private itMustBeToBeAbleToBeDisposed;
    private itMustBeAbleToRaiseAnEventListeners;
    private itMustBeAbleToRaiseMultipleEventListeners;
    private itMustBeInitializable;
    private itMustNotBeAbleToUnsuscribeByAnUnregisteredAlias;
}

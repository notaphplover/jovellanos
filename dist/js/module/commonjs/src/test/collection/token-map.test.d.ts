import { ITest } from '../ITest';
export declare class TokenMapTests implements ITest {
    performTests(): void;
    private itMustBeInitializable;
    private itMustBeAbleToAddElements;
    private itMustBeAbleToAddAndRemoveElements;
    private itMustBeAbleToIterateOverElements;
    private itMustBeAbleToReuseUnusedIndexes;
    private itMustNotBeAbleToRemoveUnusedIndexes;
}

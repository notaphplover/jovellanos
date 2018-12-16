import { TokenMap } from '../../collection/token-map';
import { ITest } from '../ITest';

export class TokenMapTests implements ITest {

    public performTests(): void {
        describe('Token Map Tests', () => {
            this.itMustBeInitializable();
            this.itMustBeAbleToAddElements();
            this.itMustBeAbleToAddAndRemoveElements();
            this.itMustBeAbleToIterateOverElements();
            this.itMustBeAbleToReuseUnusedIndexes();
            this.itMustNotBeAbleToRemoveUnusedIndexes();
        });
    }

    private itMustBeInitializable(): void {
        it('mustBeInitializable', () => {
            const map = new TokenMap();
            expect(map).not.toBe(null);
            expect(map.count()).toBe(0);
        });
    }

    private itMustBeAbleToAddElements(): void {
        it('mustBeAbleToAddElements', () => {
            const map = new TokenMap<{}>();
            const elementsToAdd = 64;

            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.add(i)).toBe(i);
            }

            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.get(i)).toBe(i);
            }

            expect(map.count()).toBe(elementsToAdd);
        });
    }

    private itMustBeAbleToAddAndRemoveElements(): void {
        it('mustBeAbleToAddAndRemoveElements', () => {
            const map = new TokenMap<{}>();
            const elementsToAdd = 64;
            const elementsToRemove = 32;
            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.add(i)).toBe(i);
            }

            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.get(i)).toBe(i);
            }

            for (var i = 0; i < elementsToRemove; ++i) {
                expect(map.remove(i)).toBe(true);
            }

            expect(map.count()).toBe(elementsToAdd - elementsToRemove);
        });
    }

    private itMustBeAbleToIterateOverElements() {
        it('mustBeAbleToIterateOverElements', () => {
            const map = new TokenMap<number>();
            const elementsToAdd = 8;
            for (var i = 0; i < elementsToAdd; ++i) {
                const power = Math.pow(2, i);
                map.add(power);
            }

            let sum = 0;
            map.foreach((value, key) => {
                sum = sum + value;
            });

            const expectedValue = Math.pow(2, elementsToAdd) - 1;
            expect(sum).toBe(expectedValue);
        });
    }

    private itMustBeAbleToReuseUnusedIndexes(): void {
        it('mustBeAbleToReuseUnusedIndexes', () => {
            const map = new TokenMap<{}>();
            const elementsToAdd = 64;
            const elementsToRemove = 32;
            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.add(i)).toBe(i);
            }

            for (var i = 0; i < elementsToAdd; ++i) {
                expect(map.get(i)).toBe(i);
            }

            for (var i = 0; i < elementsToRemove; ++i) {
                expect(map.remove(i)).toBe(true);
            }

            for (var i = 0; i < elementsToRemove; ++i) {
                expect(map.add(i)).toBeLessThan(elementsToRemove);
            }

            expect(map.count()).toBe(elementsToAdd);
        });
    }

    private itMustNotBeAbleToRemoveUnusedIndexes(): void {
        it('mustNotBeAbleToRemoveUnusedIndexes', () => {
            const map = new TokenMap<{}>();
            expect(map.remove(0)).toBe(false);
        });
    }
}

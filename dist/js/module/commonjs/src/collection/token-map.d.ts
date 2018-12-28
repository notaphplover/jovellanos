export declare class TokenMap<T> {
    protected innerMap: Map<number, T>;
    protected unusedIndexes: number[];
    constructor();
    add(elem: T): number;
    count(): number;
    foreach(consumer: (value: T, key: number) => void): void;
    get(index: number): T;
    remove(index: number): boolean;
}

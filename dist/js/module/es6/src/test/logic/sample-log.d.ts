export declare class SampleLog {
    protected logCounter: number;
    protected messageArray: string[];
    protected messageIndexes: {
        [key: string]: number;
    };
    constructor();
    logMessage(message: string): void;
    getMessage(index: number): string;
    getMessageIndex(message: string): number;
    getMessages(): string[];
}

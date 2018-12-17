export class SampleLog {

    /**
     * Log counter. The log has as many entries as the value of this counter.
     */
    protected logCounter: number;

    /**
     * Messages array
     */
    protected messageArray: string[];

    /**
     * Messages indexes.
     */
    protected messageIndexes: {[key: string]: number};

    /**
     * Creates a new sample log.
     */
    public constructor() {
        this.logCounter = 0;
        this.messageArray = new Array();
        this.messageIndexes = {};
    }

    /**
     * Logs a message.
     * @param message Message to be logged.
     */
    public logMessage(message: string) {
        this.messageArray.push(message);
        this.messageIndexes[message] = this.logCounter;
        ++this.logCounter;
    }

    /**
     * Returns the message at the specified index.
     * @param index index of the message.
     */
    public getMessage(index: number): string {
        return this.messageArray[index];
    }

    /**
     * Returns the index of a message.
     * @param message Message whose index is searched.
     */
    public getMessageIndex(message: string): number {
        return this.messageIndexes[message];
    }

    /**
     * Returns a copy of the messages in the log.
     * @returns Log array.
     */
    public getMessages(): string[] {
        const messagesCopy = new Array();
        for (const message of this.messageArray) {
            messagesCopy.push(message);
        }
        return messagesCopy;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SampleLog {
    constructor() {
        this.logCounter = 0;
        this.messageArray = new Array();
        this.messageIndexes = {};
    }
    logMessage(message) {
        this.messageArray.push(message);
        this.messageIndexes[message] = this.logCounter;
        ++this.logCounter;
    }
    getMessage(index) {
        return this.messageArray[index];
    }
    getMessageIndex(message) {
        return this.messageIndexes[message];
    }
    getMessages() {
        const messagesCopy = new Array();
        for (const message of this.messageArray) {
            messagesCopy.push(message);
        }
        return messagesCopy;
    }
}
exports.SampleLog = SampleLog;

//# sourceMappingURL=sample-log.js.map

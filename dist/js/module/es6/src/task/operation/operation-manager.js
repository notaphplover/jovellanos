import { TokenMap } from '../../collection/token-map';
export class OperationManager {
    constructor(eventAlias, eventEmitter) {
        const that = this;
        this.callFunction = function (eventArgs) {
            if (eventArgs.aliases == null) {
                for (const alias in that.subscriptionStorage) {
                    if (that.subscriptionStorage.hasOwnProperty(alias)) {
                        const subscribers = that.subscriptionStorage[alias];
                        if (subscribers != null) {
                            subscribers.foreach(function (value) {
                                value(eventArgs);
                            });
                        }
                    }
                }
            }
            else {
                for (const alias of eventArgs.aliases) {
                    const subscribers = that.subscriptionStorage[alias];
                    if (subscribers != null) {
                        subscribers.foreach(function (value) {
                            value(eventArgs);
                        });
                    }
                }
            }
        };
        this.eventAlias = eventAlias;
        this.eventEmitter = eventEmitter;
        this.subscriptionStorage = {};
        this.eventEmitter.addListener(this.eventAlias, this.callFunction);
    }
    dispose() {
        this.eventEmitter.removeListener(this.eventAlias, this.callFunction);
    }
    subscribe(alias, handler) {
        if (null == this.subscriptionStorage[alias]) {
            this.subscriptionStorage[alias] = new TokenMap();
        }
        return this.subscriptionStorage[alias].add(handler);
    }
    unsubscribe(alias, index) {
        if (null == this.subscriptionStorage[alias]) {
            return false;
        }
        else {
            return this.subscriptionStorage[alias].remove(index);
        }
    }
}

//# sourceMappingURL=operation-manager.js.map

export class TokenMap {
    constructor() {
        this.innerMap = new Map();
        this.unusedIndexes = new Array();
    }
    add(elem) {
        if (0 === this.unusedIndexes.length) {
            const lastIndex = this.innerMap.size;
            this.innerMap.set(lastIndex, elem);
            return lastIndex;
        }
        else {
            const lastIndex = this.unusedIndexes[this.unusedIndexes.length - 1];
            --this.unusedIndexes.length;
            this.innerMap.set(lastIndex, elem);
            return lastIndex;
        }
    }
    count() {
        return this.innerMap.size;
    }
    foreach(consumer) {
        this.innerMap.forEach(function (value, key) {
            consumer(value, key);
        });
    }
    get(index) {
        return this.innerMap.get(index);
    }
    remove(index) {
        if (this.innerMap.has(index)) {
            this.innerMap.delete(index);
            this.unusedIndexes[this.unusedIndexes.length] = index;
            return true;
        }
        else {
            return false;
        }
    }
}

//# sourceMappingURL=token-map.js.map

export interface IdGenerator<T> {
    getNextId(): T
}

export function createIncrementalNumberIdGenerator(startFrom = 0): IdGenerator<number> {
    const idGenerator = (function* generateId() {
        let lastId = startFrom;
        while (true) {
            yield lastId++;
        }
    })();

    return {
        getNextId() {
            return idGenerator.next().value;
        }
    }
}
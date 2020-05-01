import {createIncrementalNumberIdGenerator} from "./IdGenerator";

describe("IdGenerator", function () {
    describe("IncrementalNumberIdGenerator", () => {
        it("should generate id from 0 if no `startFrom` argument given", () => {
            // given
            const idGenerator = createIncrementalNumberIdGenerator();

            // when
            const firstId = idGenerator.getNextId();

            // then
            expect(firstId).toEqual(0);
            expect(idGenerator.getNextId()).toEqual(1);
            expect(idGenerator.getNextId()).toEqual(2);
            expect(idGenerator.getNextId()).toEqual(3);
        });

        it("should generate id from given `startFrom` argument", () => {
            // given
            const startFrom = 10;

            // when
            const idGenerator = createIncrementalNumberIdGenerator(startFrom);
            const firstId = idGenerator.getNextId();

            // then
            expect(firstId).toEqual(startFrom);
        });
    });
})
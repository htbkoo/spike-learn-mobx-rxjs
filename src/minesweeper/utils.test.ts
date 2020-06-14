import {buildBombCandidatesList, getBombsList, shuffleAndTakeList} from "./utils";

describe('utils', () => {
    describe('buildBombCandidatesList', () => {
        it('should build list of candidates', () => {
            // given
            const dimension = {width: 4, height: 2}, clickCoordinates = {row: 0, col: 2};

            // when
            const list = buildBombCandidatesList({dimension, clicked: clickCoordinates});

            // then
            expect(list).toEqual([
                [0, 0],
                [0, 1],
                [0, 3],
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 3],
            ])
        });
    });

    describe('shuffleAndTakeList', () => {
        it('should get list of bombs', () => {
            // given
            const candidates = [
                [0, 0],
                [0, 1],
                [0, 3],
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 3],
            ]
            const takeCount = 3;

            // when
            const list = shuffleAndTakeList({candidates, takeCount});

            // then
            expect(list.length).toEqual(takeCount);
        });
    });

    describe('getBombsList', () => {
        it('should get list of bombs', () => {
            // given
            const dimension = {width: 4, height: 2};
            const clicked = {row: 0, col: 2};
            const takeCount = 3;

            // when
            const list = getBombsList({dimension, clicked, takeCount});

            // then
            expect(list.length).toEqual(takeCount);
        });
    });
});
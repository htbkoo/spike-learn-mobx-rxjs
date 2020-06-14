import {buildBombCandidatesList} from "./utils";

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
});
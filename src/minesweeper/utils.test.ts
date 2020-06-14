import {
    buildBombCandidatesList,
    countNumCellsOpened,
    getBombsList,
    isCoordinatesValid,
    shuffleAndTakeList,
    SimpleCoordinates,
    SimpleCoordinatesList
} from "./utils";
import {BoardData, CellData} from "./types";

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
            const candidates: SimpleCoordinatesList = [
                [0, 0],
                [0, 1],
                [0, 3],
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 3],
            ];
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
    describe('isCoordinatesValid', () => {
        [
            {
                coordinates: coor(0, 0),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },
            {
                coordinates: coor(0, 1),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },
            {
                coordinates: coor(0, 2),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },
            {
                coordinates: coor(1, 1),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },
            {
                coordinates: coor(1, 2),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },
            {
                coordinates: coor(1, 3),
                dimension: {width: 4, height: 2},
                expectedIsValid: true,
            },

            {
                coordinates: coor(1, 4),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
            {
                coordinates: coor(2, 3),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },

            {
                coordinates: coor(-1, 0),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
            {
                coordinates: coor(0, -1),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
            {
                coordinates: coor(-1, -1),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
            {
                coordinates: coor(-2, 0),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
            {
                coordinates: coor(0, -2),
                dimension: {width: 4, height: 2},
                expectedIsValid: false,
            },
        ].forEach(({coordinates, dimension, expectedIsValid}) =>
            it(`should be ${expectedIsValid ? "valid" : "invalid"} for coordinates (${coordinates[0]}, ${coordinates[1]}) and dimension {height: ${dimension.height}, width: ${dimension.width}}`, () => {
                // given
                // when
                const actual = isCoordinatesValid({coordinates, dimension,});

                // then
                expect(actual).toEqual(expectedIsValid);
            })
        );

        function coor(row: number, col: number): SimpleCoordinates {
            return [row, col];
        }
    });

    describe('countNumCellsOpened', () => {
        it('should count number of cells that are opened in the board', () => {
            // given
            const board: BoardData = [
                [c(true), c(true), c(false), c(true), c(true),],
                [c(true), c(false), c(false), c(false), c(false),],
                [c(false), c(false), c(true), c(false), c(true),],
            ]

            // when
            const count = countNumCellsOpened(board);

            // then
            const numCellsOpened = 7;
            expect(count).toEqual(numCellsOpened)
        });

        // Fake cell
        function c(isOpen): CellData {
            return {isOpen} as any;
        }
    });
});
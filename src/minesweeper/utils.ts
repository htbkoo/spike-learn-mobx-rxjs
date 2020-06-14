import {flatten, range, shuffle, take} from "lodash";
import produce from "immer";

import {BoardData, BoardDimension, CellCoordinates} from "./types";
import {AppState, GameState, GameStatus} from "./reactHooks/PlainReactHookMinesweeperApp";

export type SimpleCoordinates = [number, number,];
export type SimpleCoordinatesList = SimpleCoordinates[];

export function buildBombCandidatesList(
    {dimension: {width, height}, clicked: {row, col}}: { dimension: BoardDimension, clicked: CellCoordinates }
): SimpleCoordinatesList { // TODO: think clearly about return type
    // TODO: (minor for now) performance?
    const allCombinations: SimpleCoordinates[] = flatten(
        range(height).map(i =>
            range(width).map(j =>
                [i, j]
            )
        )
    ) as any;
    return allCombinations.filter(([i, j]) => (i !== row) || (j !== col));
}

export function shuffleAndTakeList({candidates, takeCount}: { candidates: SimpleCoordinatesList, takeCount: number }): SimpleCoordinatesList {
    return take(shuffle(candidates), takeCount);
}

export function getBombsList({dimension, clicked, takeCount}: { dimension: BoardDimension, clicked: CellCoordinates, takeCount: number }): SimpleCoordinatesList {
    const candidates = buildBombCandidatesList({dimension, clicked});
    return shuffleAndTakeList({candidates, takeCount});
}

export function blankBoardData({width, height}: BoardDimension): BoardData {
    return range(height).map(_ =>
        range(width).map(_ => ({
            count: 0,
            isBomb: false,
            isOpen: false,
        }))
    )
}

const EIGHT_WAYS_NEIGHBOURS: SimpleCoordinates[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export function initializedBoardData(
    {oldBoard, clicked, numBomb}: { oldBoard: BoardData, clicked: CellCoordinates, numBomb: number }
): BoardData {
    const dimension: BoardDimension = getDimension(oldBoard)

    const bombCandidates = getBombsList({takeCount: numBomb, dimension, clicked});

    return produce(oldBoard, newBoard => {
        bombCandidates.forEach(([row, col]) => {
            newBoard[row][col].isBomb = true;
            addCountsToNeighbour();

            // TODO: extract this to global function for testability
            function addCountsToNeighbour() {
                EIGHT_WAYS_NEIGHBOURS
                    .map(toExactCoordinates)
                    .filter(keepValidCoordinates)
                    .forEach(addCount)
            }

            function toExactCoordinates([drow, dcol]): SimpleCoordinates {
                return [row + drow, col + dcol];
            }

            function keepValidCoordinates(coordinates) {
                return isCoordinatesValid({coordinates, dimension});
            }

            function addCount([exactRow, exactCol]) {
                newBoard[exactRow][exactCol].count++;
            }
        })

    })
}

export function isCoordinatesValid(
    {coordinates: [exactRow, exactCol], dimension: {width, height}}:
        { coordinates: SimpleCoordinates, dimension: BoardDimension }
): boolean {
    const isRowValid = (exactRow >= 0) && (exactRow < height)
    const isColValid = (exactCol >= 0) && (exactCol < width)

    return isRowValid && isColValid;
}

function getDimension(boardData: BoardData): BoardDimension {
    // TODO: add validation when `boardData` is empty
    const firstRow = boardData[0];
    return {
        width: firstRow.length,
        height: boardData.length
    }
}

export function isPlaying(state: AppState): boolean {
    return !!state.game && GameStatus.PLAYING === state.game.status;
}

export function getNextGameState(prevState: GameState, clicked: CellCoordinates): GameState {
    return produce(prevState, newState => {
        const boardData = prevState.isInitialized
            ? prevState.boardData
            : initializedBoardData({
                oldBoard: prevState.boardData,
                numBomb: prevState.config.numBomb,
                clicked,
            });

        newState.boardData = getNextBoard(boardData, clicked)
        newState.isInitialized = true;
    });
}

export function getNextBoard(prevBoard: BoardData, {row, col}: CellCoordinates): BoardData {
    return produce(prevBoard, newBoard => {
        newBoard[row][col].isOpen = true;
    });
}

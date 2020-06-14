import {flatten, range, shuffle, sumBy, take} from "lodash";
import produce from "immer";

import {BoardData, BoardDimension, CellCoordinates} from "./types";
import {AppState, GameConfig, GameState, GameStatus} from "./reactHooks/PlainReactHookMinesweeperApp";

export type SimpleCoordinates = [number, number,];
export type SimpleCoordinatesList = SimpleCoordinates[];

const FOUR_WAYS_NEIGHBOURS: SimpleCoordinatesList = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const EIGHT_WAYS_NEIGHBOURS: SimpleCoordinatesList = [
    ...FOUR_WAYS_NEIGHBOURS,
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
];

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
                findValidNeighbours(EIGHT_WAYS_NEIGHBOURS, [row, col], dimension)
                    .forEach(addCount)
            }

            function addCount([exactRow, exactCol]) {
                newBoard[exactRow][exactCol].count++;
            }
        })

    })
}

function findValidNeighbours(directions: SimpleCoordinatesList, [row, col]: SimpleCoordinates, dimension: BoardDimension): SimpleCoordinatesList {
    return directions
        .map(toExactCoordinates)
        .filter(keepValidCoordinates);

    function toExactCoordinates([drow, dcol]): SimpleCoordinates {
        return [row + drow, col + dcol];
    }

    function keepValidCoordinates(coordinates) {
        return isCoordinatesValid({coordinates, dimension});
    }
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

export function checkIsPlaying(state: AppState): boolean {
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

        newState.isInitialized = true;
        newState.boardData = getNextBoard(boardData, clicked);
        newState.status = getNextStatus(newState.boardData, clicked, prevState.config);
    });
}

export function getNextBoard(board: BoardData, {row, col}: CellCoordinates): BoardData {
    return produce(board, newBoard => {
        const clickedCell = newBoard[row][col];
        clickedCell.isOpen = true;
        if (!clickedCell.isBomb) {
            flood()
        }

        function flood() {
            const dimension = getDimension(board);
            const visited: boolean[][] = range(dimension.height).map(_ => range(dimension.width).map(_ => false));
            const queue: SimpleCoordinatesList = findValidNeighbours(FOUR_WAYS_NEIGHBOURS, [row, col], dimension);

            while (queue.length > 0) {
                const top: SimpleCoordinates = queue.shift() as any;
                const origin = newBoard[top[0]][top[1]];
                if (!origin.isBomb) {
                    origin.isOpen = true;

                    if (origin.count === 0) {
                        findValidNeighbours(FOUR_WAYS_NEIGHBOURS, top, dimension)
                            .filter(keepIfNotOpened)
                            .filter(keepUnvisited)
                            .forEach(addToQueue)
                    }
                }
            }

            function keepIfNotOpened([row, col]) {
                return !newBoard[row][col].isOpen;
            }

            function keepUnvisited([row, col]) {
                return !visited[row][col];
            }

            function addToQueue([row, col]) {
                visited[row][col] = true;
                queue.push([row, col]);
            }
        }
    });
}

export function countNumCellsOpened(board: BoardData) {
    return sumBy(board, rowData => sumBy(rowData, c => c.isOpen ? 1 : 0));
}

export function getNextStatus(board: BoardData, {row, col}: CellCoordinates, {width, height, numBomb}: GameConfig): GameStatus {
    if (winAfterClick()) {
        return GameStatus.WIN;
    } else if (loseAfterClick()) {
        return GameStatus.LOSE;
    } else {
        return GameStatus.PLAYING;
    }

    function winAfterClick() {
        const totalNumCells = width * height;
        const numCellsToOpen = totalNumCells - numBomb
        // TODO: performance
        const numCellsOpened = countNumCellsOpened(board);
        return numCellsOpened === numCellsToOpen;
    }

    function loseAfterClick() {
        return board[row][col].isBomb;
    }
}

export function createNewGameState(config: BoardDimension & { numBomb: number }) {
    return {
        status: GameStatus.PLAYING,
        isInitialized: false,
        boardData: blankBoardData(config),
        config,
    };
}
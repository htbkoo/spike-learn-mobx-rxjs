import {BoardDimension, CellCoordinates} from "./PlainReactHookMinesweeperApp";
import {flatten, range, shuffle, take} from "lodash";

type SimpleCoordinates = number[];
type SimpleCoordinatesList = SimpleCoordinates[];

export function buildBombCandidatesList(
    {dimension: {width, height}, clicked: {row, col}}: { dimension: BoardDimension, clicked: CellCoordinates }
): SimpleCoordinatesList { // TODO: think clearly about return type
    // TODO: (minor for now) performance?
    const allCombinations = flatten(
        range(height).map(i =>
            range(width).map(j =>
                ([i, j])
            )
        )
    );
    return allCombinations.filter(([i, j]) => (i !== row) || (j !== col));
}

export function shuffleAndTakeList({candidates, takeCount}: { candidates: SimpleCoordinatesList, takeCount: number }): SimpleCoordinatesList {
    return take(shuffle(candidates), takeCount);
}

export function getBombsList({dimension, clicked, takeCount}: { dimension: BoardDimension, clicked: CellCoordinates, takeCount: number }): SimpleCoordinatesList {
    const candidates = buildBombCandidatesList({dimension, clicked});
    return shuffleAndTakeList({candidates, takeCount});
}
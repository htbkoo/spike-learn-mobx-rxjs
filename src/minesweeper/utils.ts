import {flatten, range, shuffle, take} from "lodash";

import {BoardDimension, CellCoordinates} from "./types";

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
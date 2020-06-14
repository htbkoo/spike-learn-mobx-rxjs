import {BoardDimension, CellCoordinates} from "./PlainReactHookMinesweeperApp";
import {range, flatten} from "lodash";

export function buildBombCandidatesList(
    {dimension: {width, height}, clicked: {row, col}}: { dimension: BoardDimension, clicked: CellCoordinates }
): number[][] { // TODO: think clearly about return type
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
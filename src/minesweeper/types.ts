export interface CellCoordinates {
    row: number;
    col: number;
}

export interface CellData {
    isOpen: boolean,
    isBomb: boolean,
    count: number,
}

export type BoardData = CellData[][];

export interface BoardDimension {
    width: number;
    height: number;
}
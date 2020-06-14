import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {BaseTextFieldProps, createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {range} from "lodash";
import produce from "immer";

import {getBombsList, SimpleCoordinates} from "./utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        gameAppContainer: {
            "minHeight": "85vh",
            "display": "flex",
            "padding": theme.spacing(8),
            "minWidth": "100%",
            "justifyContent": "center",
            "alignItems": "center",
            "width": "max-content",
            "height": "max-content",
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
        boardContainer: {
            display: "block",
            width: "max-content",
        },
        cellButtonContainer: {
            margin: theme.spacing(0.25),
            display: "inline-block",
        },
        cellButton: {
            height: theme.spacing(8),
            width: theme.spacing(8),
            minWidth: "unset",
        }
    }),
);

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

export type GameConfig = BoardDimension & { numBomb: number; };

export interface GameState {
    config: GameConfig;
    isPlaying: boolean;
    isInitialized: boolean;
    boardData: BoardData;
}

export interface AppState {
    game?: GameState
}

function PlainReactHookMinesweeperApp() {
    const classes = useStyles();

    const [state, setState] = useState<AppState>({})

    return (
        <div className={classes.gameAppContainer}>
            {
                state.game
                    ? (
                        <BoardComponent
                            data={state.game.boardData}
                            isPlaying={state.game.isPlaying}
                            handleClick={handleClick}
                        />
                    )
                    : ""
            }
            <GameConfigDialog isOpen={!state.game} onStartGame={startGame} />
        </div>
    );

    function startGame(config: GameConfig) {
        setState(produce(state, newState => {
            newState.game = {
                isPlaying: true,
                isInitialized: false,
                boardData: blankBoardData(config),
                config,
            }
        }))
    }

    function handleClick(coordinates: CellCoordinates) {
        setState(produce(state, newState => {
            if (state.game) {
                if (!state.game.isInitialized) {
                    // TODO: refactor - this is `initializeBoard`

                    const game: GameState = newState.game as any;
                    game.boardData = initializedBoardData({
                        oldBoard: state.game.boardData,
                        clicked: coordinates,
                        numBomb: state.game.config.numBomb
                    })
                    game.isInitialized = true;
                }

                // TODO: refactor - this is `clickCell`

            }
        }))

        function clickCell() {

        }
    }
}

function GameConfigDialog({isOpen, onStartGame}: { isOpen: boolean, onStartGame: (config: GameConfig) => void }) {
    const [config, setConfig] = useState<GameConfig>({
        width: 10,
        height: 8,
        numBomb: 10,
    })

    return (
        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Setup the game</DialogTitle>
            <DialogContent>
                {/* TODO: add validation on game config (e.g. width, height must be positive, numBomb<width*height */}
                <DialogContentText>
                    Please set the game config
                </DialogContentText>
                {
                    Object
                        .keys(config)
                        .map(field => (
                            <DialogTextField
                                key={field}
                                id={field}
                                label={field} // TODO: add string capitalize
                                value={config[field]}
                                setValue={setFormField(field as any)}
                            />
                        ))
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onStartGame(config)} color="primary">
                    Start Game
                </Button>
            </DialogActions>
        </Dialog>
    )

    function setFormField(field: keyof GameConfig) {
        return value => setConfig(produce(config, newConfig => {
            newConfig[field] = value
        }));

        // This also works and is slightly cleaner, but we would lose the type for `newConfig`
        // return value => setConfig(produce(newConfig => {
        //     newConfig[field] = value
        // }));
    }
}

function DialogTextField<T>({value, setValue, ...otherProps}: { value: T, setValue: (value: string) => void } & BaseTextFieldProps) {
    return (
        <TextField
            variant="standard"
            margin="dense"
            value={value}
            onChange={event => setValue(event.target.value)}
            type="number"
            fullWidth
            {...otherProps}
        />
    )
}

function blankBoardData({width, height}: BoardDimension): BoardData {
    return range(height).map(_ =>
        range(width).map(_ =>
            ({
                count: 0,
                isBomb: false,
                isOpen: false,
            } as CellData)
        )
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

function initializedBoardData(
    {oldBoard, clicked, numBomb}: { oldBoard: BoardData, clicked: CellCoordinates, numBomb: number }
): BoardData {
    const dimension: BoardDimension = getDimension(oldBoard)

    // TODO: refactor this -> probably create a convenient function that takes both
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

            function keepValidCoordinates([exactRow, exactCol]) {
                const isRowValid = (exactRow >= 0) && (exactRow < dimension.height)
                const isColValid = (exactCol >= 0) && (exactCol < dimension.width)

                return isRowValid && isColValid;
            }

            function addCount([exactRow, exactCol]) {
                newBoard[exactRow][exactCol].count++;
            }
        })

    })
}

function getDimension(boardData: BoardData): BoardDimension {
    return {
        width: boardData[0].length,
        height: boardData.length
    }
}

function BoardComponent(
    {data, isPlaying, handleClick}:
        { data: BoardData, isPlaying: boolean, handleClick: (coor: CellCoordinates) => void }
) {
    const classes = useStyles();

    return (
        <div className={classes.boardContainer}>
            {data.map((rowData, row) => (
                <div key={`row_${row}`}>
                    {
                        rowData.map((cellData, col) => (
                            <div
                                key={`cell_${row * rowData.length + col}`}
                                className={classes.cellButtonContainer}
                            >
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.cellButton}
                                    children={cellData.isBomb ? "B" : cellData.count !== 0 ? cellData.count : ""}
                                    disabled={cellData.isOpen || !isPlaying}
                                    onClick={() => handleClick({row, col})}
                                />
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}

export default PlainReactHookMinesweeperApp;
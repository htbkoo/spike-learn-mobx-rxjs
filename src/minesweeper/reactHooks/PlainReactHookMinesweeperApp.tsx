import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import produce from "immer";

import {blankBoardData, initializedBoardData} from "../utils";
import {BoardData, BoardDimension, CellCoordinates} from "../types";
import GameConfigDialog from "./GameConfigDialog";

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

    const gameBoardIfGameStarted = state.game
        ? (
            <BoardComponent
                data={state.game.boardData}
                isPlaying={state.game.isPlaying}
                handleClick={handleClick}
            />
        )
        : ""

    return (
        <div className={classes.gameAppContainer}>
            {gameBoardIfGameStarted}
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
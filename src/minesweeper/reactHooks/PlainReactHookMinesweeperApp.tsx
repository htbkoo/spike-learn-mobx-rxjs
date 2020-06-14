import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import produce from "immer";

import {blankBoardData, initializedBoardData} from "../utils";
import {BoardData, BoardDimension, CellCoordinates} from "../types";
import GameConfigDialog from "./GameConfigDialog";
import BoardComponent from "./BoardComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
                newState.game = getNextGameState(state.game, coordinates);
                if (!state.game.isInitialized) {
                    newState.game = initializeGame(state.game, coordinates);
                } else {
                    // clickCell
                }

                // TODO: refactor - this is `clickCell`
            }
        }))
    }
}

function getNextGameState(prevState: GameState, clicked: CellCoordinates): GameState {
    return produce(prevState, newState => {
        const boardData = prevState.isInitialized
            ? prevState.boardData
            : initializedBoardData({
                oldBoard: prevState.boardData,
                numBomb: prevState.config.numBomb,
                clicked,
            });

        newState.boardData = clickCell(boardData, clicked)
        newState.isInitialized = true;
    });

    // if (!prevState.isInitialized) {
    //     return initializeGame(prevState, clicked);
    // } else {
    //     return clickCell(prevState.boardData, clicked);
    // }
}

function initializeGame(prevState: GameState, clicked: CellCoordinates) {
    return produce(prevState, newGame => {
        const boardData = initializedBoardData({
            oldBoard: prevState.boardData,
            numBomb: prevState.config.numBomb,
            clicked,
        });

        newGame.boardData = clickCell(boardData, clicked)
        newGame.isInitialized = true;
    });
}

function clickCell(prevBoard: BoardData, {row, col}: CellCoordinates): BoardData {
    return produce(prevBoard, newBoard => {
        newBoard[row][col].isOpen = true;
    });
}

export default PlainReactHookMinesweeperApp;
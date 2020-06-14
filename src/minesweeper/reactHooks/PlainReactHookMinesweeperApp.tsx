import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import produce from "immer";

import {createNewGameState, getNextGameState, checkIsPlaying} from "../utils";
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

export enum GameStatus {
    "PLAYING" = "PLAYING",
    "WIN" = "WIN",
    "LOSE" = "LOSE",
}

export interface GameState {
    config: GameConfig;
    status: GameStatus;
    isInitialized: boolean;
    boardData: BoardData;
}

export interface AppState {
    game?: GameState
}

function PlainReactHookMinesweeperApp() {
    const classes = useStyles();

    const [state, setState] = useState<AppState>({})

    const isPlaying = checkIsPlaying(state);
    const gameBoardIfGameStarted = state.game
        ? (
            <BoardComponent
                data={state.game.boardData}
                isPlaying={isPlaying}
                handleClick={handleClick}
            />
        )
        : ""

    const shouldShowDialog = !state.game || !isPlaying;
    return (
        <div className={classes.gameAppContainer}>
            {gameBoardIfGameStarted}
            <GameConfigDialog isOpen={shouldShowDialog} onStartGame={startGame} />
        </div>
    );

    function startGame(config: GameConfig) {
        setState(produce(state, newState => {
            newState.game = createNewGameState(config)
        }))
    }

    function handleClick(coordinates: CellCoordinates) {
        setState(produce(state, newState => {
            if (state.game) {
                newState.game = getNextGameState(state.game, coordinates);
            }
        }))
    }
}

export default PlainReactHookMinesweeperApp;
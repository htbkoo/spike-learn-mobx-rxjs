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

interface CellData {
    isOpen: boolean,
    isBomb: boolean,
    count: number,

    // TODO: maybe refactor this
    handleClick: (row, col) => void,
}

type BoardData = CellData[][];

interface BoardDimension {
    width: number;
    height: number;
}

type GameConfig = BoardDimension & { numBomb: number; };

interface AppState {
    game?: {
        config: GameConfig;
        isPlaying: true;
        boardData: BoardData;
    }
}

function PlainReactHookMinesweeperApp() {
    const classes = useStyles();

    const [state, setState] = useState<AppState>({})

    return (
        <div className={classes.gameAppContainer}>
            {
                state.game
                    ? (<BoardComponent data={state.game.boardData} />)
                    : ""
            }
            <GameConfigDialog isOpen={!state.game} onStartGame={startGame} />
        </div>
    );

    function startGame(config: GameConfig) {
        setState(produce(state, newState => {
            newState.game = {
                isPlaying: true,
                boardData: blankBoardData(config),
                config,
            }
        }))
    }
}

function GameConfigDialog({isOpen, onStartGame}: { isOpen: boolean, onStartGame: (config: GameConfig) => void }) {
    const [config, setConfig] = useState<GameConfig>({
        width: 8,
        height: 6,
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
                handleClick(row, col) {
                    console.log(`${row}, ${col}`);
                    this.isOpen = true;
                }
            } as CellData)
        )
    )
}

function BoardComponent({data}: { data: BoardData }) {
    const classes = useStyles();

    return (
        <div className={classes.boardContainer}>
            {data.map((row, i) => (
                <div key={`row_${i}`}>
                    {
                        row.map((cellData, j) => (
                            <div
                                key={`cell_${i * row.length + j}`}
                                className={classes.cellButtonContainer}
                            >
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.cellButton}
                                    children=""
                                    disabled={cellData.isOpen}
                                    onClick={() => cellData.handleClick(i, j)}
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